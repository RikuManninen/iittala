import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent } from "leaflet";
import myLocation from "./svg/myLocation.svg"

Control.Locate = Control.extend({

  onAdd: function(map, coords=this.options.coords) {

    const controlDiv = DomUtil.create('div', 'leaflet-control-locate-toolbar leaflet-bar');
    DomEvent
      .addListener(controlDiv, 'click', DomEvent.stopPropagation)
      .addListener(controlDiv, 'click', DomEvent.preventDefault)
      .addListener(controlDiv, 'click', function() {
        map.flyTo(coords, 18)
      });

    const controlUI = DomUtil.create('a', 'leaflet-control-locate', controlDiv);
    controlUI.title = 'Locate user';
    controlUI.href = '#';

    const img = DomUtil.create("img", 'leaflet-control-locate-icon', controlUI);
    img.src = myLocation;
    img.style.width = "25px";
    img.style.height = "30px";
    
    return controlDiv;
  },

  onRemove: function(map) {},
});

const createLocateControlComponent = (props) => {
  const { coords } = props;
  const instance = new Control.Locate({
    position: "topleft",
    coords,
  })

  return instance
}

export const LocateControl = createControlComponent(createLocateControlComponent);