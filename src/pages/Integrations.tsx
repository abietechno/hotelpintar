import { useState, useEffect } from "react";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Integrations() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    fetch("/api/ota-integrations")
      .then(res => res.json())
      .then(data => setIntegrations(data.integrations));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await fetch("/api/ota-integrations/config", { method: "POST" });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex-1 space-y-4 max-w-4xl">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">API & Integrations</h2>
          <p className="text-muted-foreground mt-1 text-sm">Configure endpoints for Online Travel Agencies (OTA) and external systems.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>OTA Webhook Configuration</CardTitle>
            <CardDescription>
              Set up two-way sync for reservations, inventory, and rates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {integrations.map((ota) => (
              <div key={ota.id} className="p-4 border rounded-xl bg-card space-y-4 transition-colors hover:bg-muted/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      OTA
                    </div>
                    <h3 className="font-semibold text-sm">{ota.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id={`active-${ota.id}`} defaultChecked={ota.active} />
                    <label
                      htmlFor={`active-${ota.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Active
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground" htmlFor={`api-${ota.id}`}>API Key</label>
                      <Input 
                        id={`api-${ota.id}`}
                        type="password" 
                        defaultValue={ota.active ? "*********************" : ""}
                        placeholder={`Enter ${ota.name} API Key`}
                        className="font-mono text-sm"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground" htmlFor={`webhook-${ota.id}`}>Webhook Endpoint</label>
                      <Input 
                        id={`webhook-${ota.id}`}
                        type="text" 
                        defaultValue={ota.active ? `https://api.toscaerp.com/webhook/${ota.id}` : ""}
                        placeholder="https://"
                        className="text-sm"
                      />
                   </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
           <Button type="submit" disabled={status === "saving"} className="min-w-[140px]">
             {status === "saving" ? (
               <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
             ) : (
               <Save className="w-4 h-4 mr-2" />
             )}
             Save Settings
           </Button>
           
           {status === "success" && (
             <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 animate-in fade-in slide-in-from-left-2">
               <CheckCircle2 className="w-4 h-4" /> Config saved
             </span>
           )}
           {status === "error" && (
             <span className="flex items-center gap-1.5 text-sm font-medium text-destructive animate-in fade-in slide-in-from-left-2">
               <AlertCircle className="w-4 h-4" /> Failed to save
             </span>
           )}
        </div>
      </form>
    </div>
  );
}
