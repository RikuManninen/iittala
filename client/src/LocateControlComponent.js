import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent } from "leaflet";

Control.Locate = Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function(map) {

        var controlDiv = DomUtil.create('div', 'leaflet-locate-toolbar leaflet-bar');
        DomEvent
            .addListener(controlDiv, 'click', DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', DomEvent.preventDefault)
            .addListener(controlDiv, 'click', function() {
                map.flyTo([60.7377, 24.7867], 18)
            });

        var controlUI = DomUtil.create('a', 'leaflet-control-locate', controlDiv);
        controlUI.title = 'Locate user';
        controlUI.href = '#';
        controlUI.text = 'hello'
        return controlDiv;
    },

    onRemove: function(map) {},
});

export const LocateControl = createControlComponent(
    (props) => new Control.Locate(props)
);