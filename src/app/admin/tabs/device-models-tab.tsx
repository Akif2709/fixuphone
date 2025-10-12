"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Smartphone, Tablet } from "lucide-react";
import { getAllBrands, getAllDeviceModels, createDeviceModel, deleteDeviceModel } from "@/lib/database-actions";
import type { SerializedBrand, SerializedDeviceModel, DeviceType } from "@/types";

export function DeviceModelsTab() {
  const [brands, setBrands] = useState<SerializedBrand[]>([]);
  const [deviceModels, setDeviceModels] = useState<SerializedDeviceModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const [brandsResult, modelsResult] = await Promise.all([getAllBrands(), getAllDeviceModels()]);

      if (brandsResult.success && brandsResult.data) {
        setBrands(brandsResult.data);
      }

      if (modelsResult.success && modelsResult.data) {
        setDeviceModels(modelsResult.data);
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
                <Select value={formData.brandId} onValueChange={(value) => setFormData({ ...formData, brandId: value })} required>
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
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as DeviceType })} required>
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
      <Card>
        <CardHeader>
          <CardTitle>Apparaat Modellen ({filteredModels.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredModels.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Geen apparaat modellen gevonden.</div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedModels)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([brandName, models]) => (
                  <div key={brandName}>
                    <h3 className="font-semibold text-lg mb-3">{brandName}</h3>
                    <div className="space-y-2">
                      {models
                        .sort((a, b) => b.releaseYear - a.releaseYear || a.name.localeCompare(b.name))
                        .map((model) => (
                          <div
                            key={model._id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              {model.type === "phone" ? (
                                <Smartphone className="h-5 w-5 text-gray-500" />
                              ) : (
                                <Tablet className="h-5 w-5 text-gray-500" />
                              )}
                              <div className="flex-1">
                                <div className="font-medium">
                                  {model.name} ({model.releaseYear})
                                </div>
                                {model.specifications && <div className="text-sm text-gray-500">{model.specifications}</div>}
                                <div className="text-xs text-gray-400 capitalize">{model.type === "phone" ? "Telefoon" : "Tablet"}</div>
                              </div>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(model._id, model.name)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
