"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Smartphone, Tablet, ChevronDown, ChevronUp, Save } from "lucide-react";
import type { SerializedDeviceModel, SerializedRepairType, SerializedRepairService } from "@/types";

interface DeviceModelsListProps {
  filteredModels: SerializedDeviceModel[];
  groupedModels: Record<string, SerializedDeviceModel[]>;
  repairTypes: SerializedRepairType[];
  repairServices: Record<string, SerializedRepairService[]>;
  expandedDevices: Set<string>;
  priceInputs: Record<string, string>;
  estimatedTimeInputs: Record<string, string>;
  savingPrices: Set<string>;
  onToggleExpanded: (deviceId: string) => void;
  onDelete: (id: string | undefined, name: string) => void;
  onSavePrice: (deviceId: string, repairTypeId: string) => void;
  onPriceInputChange: (key: string, value: string) => void;
  onTimeInputChange: (key: string, value: string) => void;
}

export function DeviceModelsList({
  filteredModels,
  groupedModels,
  repairTypes,
  repairServices,
  expandedDevices,
  priceInputs,
  estimatedTimeInputs,
  savingPrices,
  onToggleExpanded,
  onDelete,
  onSavePrice,
  onPriceInputChange,
  onTimeInputChange,
}: DeviceModelsListProps) {
  return (
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
                      .map((model) => {
                        const isExpanded = expandedDevices.has(model._id!);
                        const deviceServices = repairServices[model._id!] || [];

                        return (
                          <div key={model._id} className="border rounded-lg bg-gray-50 overflow-hidden">
                            {/* Device Header */}
                            <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
                              <button
                                onClick={() => model._id && onToggleExpanded(model._id)}
                                className="flex items-center gap-3 flex-1 text-left"
                              >
                                {model.type === "phone" ? (
                                  <Smartphone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                  <Tablet className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <div className="font-medium">
                                    {model.name} ({model.releaseYear})
                                  </div>
                                  {model.specifications && <div className="text-sm text-gray-500">{model.specifications}</div>}
                                  <div className="text-xs text-gray-400 capitalize">{model.type === "phone" ? "Telefoon" : "Tablet"}</div>
                                </div>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                )}
                              </button>
                              <Button variant="destructive" size="sm" onClick={() => onDelete(model._id, model.name)} className="ml-2">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Expanded Content - Repair Services */}
                            {isExpanded && (
                              <div className="border-t bg-white p-4">
                                <h4 className="font-medium mb-3 text-sm text-gray-700">Reparatie Services & Prijzen</h4>
                                {repairTypes.length === 0 ? (
                                  <div className="text-sm text-gray-500">Geen reparatietypes beschikbaar.</div>
                                ) : (
                                  <div className="space-y-3">
                                    {repairTypes.map((repairType) => {
                                      const key = `${model._id}-${repairType._id}`;
                                      const existingService = deviceServices.find((s) => s.repairTypeId === repairType._id);
                                      const isSaving = savingPrices.has(key);

                                      return (
                                        <div key={repairType._id} className="flex items-center gap-3 p-3 border rounded bg-gray-50">
                                          <div className="flex-1">
                                            <div className="font-medium text-sm">{repairType.name}</div>
                                            {repairType.description && <div className="text-xs text-gray-500">{repairType.description}</div>}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className="space-y-1">
                                              <Label htmlFor={`price-${key}`} className="text-xs">
                                                Prijs (€)
                                              </Label>
                                              <Input
                                                id={`price-${key}`}
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                value={priceInputs[key] || ""}
                                                onChange={(e) => onPriceInputChange(key, e.target.value)}
                                                className="w-24 h-8 text-sm"
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <Label htmlFor={`time-${key}`} className="text-xs">
                                                Tijd (min)
                                              </Label>
                                              <Input
                                                id={`time-${key}`}
                                                type="number"
                                                min="1"
                                                placeholder="30"
                                                value={estimatedTimeInputs[key] || ""}
                                                onChange={(e) => onTimeInputChange(key, e.target.value)}
                                                className="w-20 h-8 text-sm"
                                              />
                                            </div>
                                            <Button
                                              size="sm"
                                              onClick={() => repairType._id && model._id && onSavePrice(model._id, repairType._id)}
                                              disabled={isSaving || !priceInputs[key]}
                                              className="mt-5 h-8"
                                            >
                                              {isSaving ? (
                                                "..."
                                              ) : existingService ? (
                                                <>
                                                  <Save className="h-3 w-3 mr-1" />
                                                  Update
                                                </>
                                              ) : (
                                                <>
                                                  <Plus className="h-3 w-3 mr-1" />
                                                  Opslaan
                                                </>
                                              )}
                                            </Button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

