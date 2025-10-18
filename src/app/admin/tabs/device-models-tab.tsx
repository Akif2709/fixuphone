"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  getAllBrands,
  getAllDeviceModels,
  createDeviceModel,
  deleteDeviceModel,
  getAllRepairTypes,
  getAllRepairServices,
  createRepairService,
  updateRepairService,
} from "@/lib/database-actions";
import type { SerializedBrand, SerializedDeviceModel, SerializedRepairType, SerializedRepairService, DeviceType } from "@/types";
import { DeviceModelsList } from "./components/device-models-list";

export function DeviceModelsTab() {
  const [brands, setBrands] = useState<SerializedBrand[]>([]);
  const [deviceModels, setDeviceModels] = useState<SerializedDeviceModel[]>([]);
  const [repairTypes, setRepairTypes] = useState<SerializedRepairType[]>([]);
  const [allRepairServices, setAllRepairServices] = useState<SerializedRepairService[]>([]);
  const [repairServices, setRepairServices] = useState<Record<string, SerializedRepairService[]>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expanded state for each device
  const [expandedDevices, setExpandedDevices] = useState<Set<string>>(new Set());

  // Price input state for each device-repair type combination
  const [priceInputs, setPriceInputs] = useState<Record<string, string>>({});
  const [estimatedTimeInputs, setEstimatedTimeInputs] = useState<Record<string, string>>({});
  const [savingPrices, setSavingPrices] = useState<Set<string>>(new Set());

  // Form state
  const [formData, setFormData] = useState({
    brandId: "",
    name: "",
    type: "phone" as DeviceType,
    releaseYear: new Date().getFullYear(),
    specifications: "",
  });

  // Filter state
  const [filterBrand, setFilterBrand] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [brandsResult, modelsResult, repairTypesResult, repairServicesResult] = await Promise.all([
        getAllBrands(),
        getAllDeviceModels(),
        getAllRepairTypes(),
        getAllRepairServices(),
      ]);

      if (brandsResult.success && brandsResult.data) {
        setBrands(brandsResult.data);
      }

      if (modelsResult.success && modelsResult.data) {
        setDeviceModels(modelsResult.data);
      }

      if (repairTypesResult.success && repairTypesResult.data) {
        setRepairTypes(repairTypesResult.data);
      }

      if (repairServicesResult.success && repairServicesResult.data) {
        setAllRepairServices(repairServicesResult.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createDeviceModel({
        brandId: formData.brandId,
        name: formData.name,
        type: formData.type,
        releaseYear: formData.releaseYear,
        specifications: formData.specifications || undefined,
      });

      if (result.success) {
        // Reset form
        setFormData({
          brandId: "",
          name: "",
          type: "phone",
          releaseYear: new Date().getFullYear(),
          specifications: "",
        });
        // Refresh data
        await fetchData();
      } else {
        console.error("Error creating device model:", result.error);
      }
    } catch (error) {
      console.error("Error creating device model:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | undefined, name: string) => {
    if (!id) return;

    if (!confirm(`Weet u zeker dat u "${name}" wilt verwijderen?`)) {
      return;
    }

    try {
      const result = await deleteDeviceModel(id);
      if (result.success) {
        await fetchData();
      } else {
        console.error("Error deleting device model:", result.error);
      }
    } catch (error) {
      console.error("Error deleting device model:", error);
    }
  };

  const toggleDeviceExpanded = (deviceId: string) => {
    const newExpanded = new Set(expandedDevices);

    if (newExpanded.has(deviceId)) {
      newExpanded.delete(deviceId);
    } else {
      newExpanded.add(deviceId);

      // Filter repair services for this device from allRepairServices
      const deviceServices = allRepairServices.filter((service) => service.deviceModelId === deviceId);
      
      setRepairServices((prev) => ({
        ...prev,
        [deviceId]: deviceServices,
      }));

      // Prefill price and time inputs from existing services
      const newPriceInputs: Record<string, string> = {};
      const newTimeInputs: Record<string, string> = {};
      
      deviceServices.forEach((service) => {
        const key = `${deviceId}-${service.repairTypeId}`;
        newPriceInputs[key] = service.price.toString();
        newTimeInputs[key] = service.estimatedTimeMinutes.toString();
      });
      
      setPriceInputs((prev) => ({ ...prev, ...newPriceInputs }));
      setEstimatedTimeInputs((prev) => ({ ...prev, ...newTimeInputs }));
      
      console.log(`Loaded ${deviceServices.length} repair services for device ${deviceId}`);
    }

    setExpandedDevices(newExpanded);
  };

  const handleSavePrice = async (deviceId: string, repairTypeId: string) => {
    const key = `${deviceId}-${repairTypeId}`;
    const price = parseFloat(priceInputs[key] || "0");
    const estimatedTime = parseInt(estimatedTimeInputs[key] || "30");

    if (isNaN(price) || price < 0) {
      alert("Voer een geldige prijs in");
      return;
    }

    if (isNaN(estimatedTime) || estimatedTime < 1) {
      alert("Voer een geldige geschatte tijd in (in minuten)");
      return;
    }

    setSavingPrices((prev) => new Set(prev).add(key));

    try {
      // Find existing service from allRepairServices
      const existingService = allRepairServices.find(
        (s) => s.deviceModelId === deviceId && s.repairTypeId === repairTypeId
      );

      let result;
      if (existingService && existingService._id) {
        // Update existing service
        console.log(`Updating existing service: ${existingService._id}`);
        result = await updateRepairService(existingService._id, {
          price,
          estimatedTimeMinutes: estimatedTime,
        });
      } else {
        // Create new service
        console.log(`Creating new service for device ${deviceId} and repair type ${repairTypeId}`);
        result = await createRepairService({
          deviceModelId: deviceId,
          repairTypeId,
          price,
          estimatedTimeMinutes: estimatedTime,
        });
      }

      if (result.success && result.data) {
        // Update allRepairServices state
        if (existingService) {
          // Update existing service in the array
          setAllRepairServices((prev) =>
            prev.map((service) =>
              service._id === existingService._id ? result.data! : service
            )
          );
        } else {
          // Add new service to the array
          setAllRepairServices((prev) => [...prev, result.data!]);
        }

        // Update the repairServices for this device
        const updatedDeviceServices = allRepairServices
          .filter((service) => service.deviceModelId === deviceId)
          .map((service) => 
            service._id === existingService?._id ? result.data! : service
          );
        
        if (!existingService) {
          updatedDeviceServices.push(result.data);
        }

        setRepairServices((prev) => ({
          ...prev,
          [deviceId]: updatedDeviceServices,
        }));

        // Update the input fields with the saved values
        setPriceInputs((prev) => ({ ...prev, [key]: price.toString() }));
        setEstimatedTimeInputs((prev) => ({ ...prev, [key]: estimatedTime.toString() }));

      } else {
        alert(`Fout bij opslaan: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving price:", error);
      alert("Er is een fout opgetreden bij het opslaan");
    } finally {
      setSavingPrices((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }
  };

  // Filter device models
  const filteredModels = deviceModels.filter((model) => {
    const matchesBrand = filterBrand === "all" || model.brandId === filterBrand;
    const matchesType = filterType === "all" || model.type === filterType;
    return matchesBrand && matchesType;
  });

  // Group by brand
  const groupedModels = filteredModels.reduce(
    (acc, model) => {
      const brand = brands.find((b) => b._id === model.brandId);
      const brandName = brand?.name || "Onbekend";
      if (!acc[brandName]) {
        acc[brandName] = [];
      }
      acc[brandName].push(model);
      return acc;
    },
    {} as Record<string, SerializedDeviceModel[]>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Laden...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add New Device Model Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Nieuw Apparaat Model Toevoegen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brandId">Merk *</Label>
                <Select
                  value={formData.brandId}
                  onValueChange={(value: string) => setFormData({ ...formData, brandId: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer merk" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id || ""}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Model Naam *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="bijv. iPhone 15 Pro Max"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: DeviceType) =>
                    setFormData({ ...formData, type: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Telefoon</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseYear">Release Jaar *</Label>
                <Input
                  id="releaseYear"
                  type="number"
                  value={formData.releaseYear}
                  onChange={(e) => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                  min="2000"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specifications">Specificaties (optioneel)</Label>
                <Input
                  id="specifications"
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  placeholder="bijv. 6.7 inch, 256GB, A17 Pro chip"
                />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? "Toevoegen..." : "Apparaat Model Toevoegen"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filterBrand">Filter op Merk</Label>
              <Select value={filterBrand} onValueChange={setFilterBrand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Merken</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand._id} value={brand._id || ""}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterType">Filter op Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Types</SelectItem>
                  <SelectItem value="phone">Telefoon</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Models List */}
      <DeviceModelsList
        filteredModels={filteredModels}
        groupedModels={groupedModels}
        repairTypes={repairTypes}
        repairServices={repairServices}
        expandedDevices={expandedDevices}
        priceInputs={priceInputs}
        estimatedTimeInputs={estimatedTimeInputs}
        savingPrices={savingPrices}
        onToggleExpanded={toggleDeviceExpanded}
        onDelete={handleDelete}
        onSavePrice={handleSavePrice}
        onPriceInputChange={(key, value) => setPriceInputs((prev) => ({ ...prev, [key]: value }))}
        onTimeInputChange={(key, value) => setEstimatedTimeInputs((prev) => ({ ...prev, [key]: value }))}
      />
    </div>
  );
}
