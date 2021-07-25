import { createControlComponent } from "@react-leaflet/core";
import L, { Control, DomEvent, DomUtil } from "leaflet";

Control.Developer = Control.Layers.extend({

  onAdd: function (map) {
		this._initLayout();
		this._addButton(map);
		this._update();
		return this._container;
	},

  _addButton: function (map) {
    this._container.classList.add("control-developer");
	  var elements = this._container.getElementsByClassName('leaflet-control-layers-list');
    var input = DomUtil.create('input', 'btn-disable-bounds leaflet-control-layers-selector', elements[0]);
	  var label = DomUtil.create('span', 'btn-disable-bounds-label', elements[0]);
    input.setAttribute('type', 'checkbox');
	  label.textContent = 'Disable bounds';
	  DomEvent.on(input, 'click', function(e){
      map.setMaxBounds(null)
      map.setMinZoom(null)
	  }, this);
	}

});

const createDeveloperControlComponent = () => {
  const instance = new Control.Developer({
  })

  return instance
}

export const DevControl = createControlComponent(createDeveloperControlComponent);