import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent } from "leaflet";
import myLocation from "./myLocation.svg"
import marker from "./marker.svg"

Control.Locate = Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function(map) {

        const controlDiv = DomUtil.create('div', 'leaflet-control-locate-toolbar leaflet-bar');
        DomEvent
            .addListener(controlDiv, 'click', DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', DomEvent.preventDefault)
            .addListener(controlDiv, 'click', function() {
                map.flyTo([60.7377, 24.7867], 18)
            });

        const controlUI = DomUtil.create('a', 'leaflet-control-locate', controlDiv);
        controlUI.title = 'Locate user';
        controlUI.href = '#';

        const img = DomUtil.create("img", 'leaflet-control-locate-icon', controlUI);
        img.src = myLocation;
        img.style.width = "30px";
        img.style.height = "30px";
        
        return controlDiv;
    },

    onRemove: function(map) {},
});

export const LocateControl = createControlComponent(
    (props) => new Control.Locate(props)
);