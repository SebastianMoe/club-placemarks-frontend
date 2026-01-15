<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { Control, Map as LeafletMap, LayerGroup } from "leaflet";

  let { height = 80 } = $props();
  let id = "home-map-id";
  let location = { lat: 49.0134, lng: 12.1016 }; 
  let zoom = 12;
  let minZoom = 7;
  let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Record<string, LayerGroup> = {}; 
  let baseLayers: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    baseLayers = {
      Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution: 'Map data: &copy; OpenStreetMap contributors'
      })
    };

    const categories = ["education", "sports", "music", "rescue", "other"];
    categories.forEach(cat => {
        overlays[cat] = L.layerGroup();
    });

    let defaultLayer = baseLayers[activeLayer];
    
    imap = leaflet.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom,
      minZoom: minZoom,
      layers: [defaultLayer, ...Object.values(overlays)] 
    });

    const overlayControl: any = {};
    for (const [key, layer] of Object.entries(overlays)) {
        const label = key.charAt(0).toUpperCase() + key.slice(1); 
        overlayControl[label] = layer;
    }

    control = leaflet.control.layers(baseLayers, overlayControl).addTo(imap);
  });

  export async function addMarker(lat: number, lng: number, popupText: string, category: string = "other") {
    if (!imap) return; 
    
    const leaflet = await import("leaflet");
    const L = leaflet.default;
    
    const marker = L.marker([lat, lng]);
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
    
    const targetLayer = overlays[category] || overlays["other"];
    targetLayer.addLayer(marker);
  }

  export async function moveTo(lat: number, lng: number) {
    if (!imap) return;
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

<div {id} class="box" style="height: {height}vh; width: 100%; z-index: 0;"></div>