"use client";

import { useState, useEffect } from "react";
import { SerializedRepairService, SerializedRepairType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Euro, Clock, AlertCircle } from "lucide-react";

interface PriceDisplayProps {
  deviceModelId: string | null;
  deviceModelName?: string;
  allRepairServices?: RepairServiceWithType[];
  selectedService?: string;
}

interface RepairServiceWithType extends SerializedRepairService {
  repairType: SerializedRepairType;
}

export function PriceDisplay({ deviceModelId, deviceModelName, allRepairServices, selectedService }: PriceDisplayProps) {
  const [repairServices, setRepairServices] = useState<RepairServiceWithType[]>([]);

  useEffect(() => {
    if (!deviceModelId) {
      setRepairServices([]);
      return;
    }

    // If all repair services are provided, filter them on the client side
    if (allRepairServices) {
      let filteredServices = allRepairServices.filter((service) => service.deviceModelId === deviceModelId);

      // If a specific service is selected, filter to that service only
      if (selectedService) {
        // Find the service name from the repairServices array
        filteredServices = filteredServices.filter((s) => s.repairType.name === selectedService);
      }

      // Filter out services with price 0 (treat as no price)
      filteredServices = filteredServices.filter((service) => service.price > 0);

      setRepairServices(filteredServices);
      return;
    }
  }, [deviceModelId, allRepairServices, selectedService]);

  if (!deviceModelId) {
    return null;
  }

  if (repairServices.length === 0) {
    return (
      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-blue-800">
            <AlertCircle className="h-5 w-5 mr-2" />
            {selectedService ? "Prijzen op aanvraag" : "Geen prijzen beschikbaar"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">
            {selectedService
              ? `Voor deze reparatie service zijn momenteel geen prijzen beschikbaar. Neem contact met ons op voor een offerte.`
              : "Voor dit model zijn momenteel geen standaard prijzen beschikbaar. Neem contact met ons op voor een persoonlijke offerte."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Euro className="h-5 w-5 mr-2 text-green-600" />
          {selectedService
            ? `Prijs voor ${repairServices[0]?.repairType?.name || "geselecteerde service"}`
            : `Prijzen voor ${deviceModelName || "geselecteerd model"}`}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {selectedService ? "Prijs is inclusief BTW en garantie" : "Alle prijzen zijn inclusief BTW en garantie"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {repairServices.map((service) => (
            <div key={service._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{service.repairType?.name || "Onbekende service"}</h4>
                {service.description && <p className="text-sm text-gray-600 mt-1">{service.description}</p>}
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.estimatedTimeMinutes} min
                  </div>
                  {!service.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Niet beschikbaar
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">€{service.price.toFixed(2)}</div>
                <div className="text-sm text-gray-500">vanaf</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Let op:</strong> Dit zijn richtprijzen. De uiteindelijke prijs kan variëren afhankelijk van de specifieke schade en
            benodigde onderdelen.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
