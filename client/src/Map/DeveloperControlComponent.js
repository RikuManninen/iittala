import { createControlComponent } from "@react-leaflet/core";
import { Control, DomEvent, DomUtil } from "leaflet";

Control.Developer = Control.Layers.extend({

  onAdd: function (map) {
		this._initLayout();
		this._addButton();
		this._update();
    console.log(this._container)
		return this._container;
	},

  _addButton: function () {
    this._container.classList.add("control-developer");
	  var elements = this._container.getElementsByClassName('leaflet-control-layers-list');
	  var button = DomUtil.create('button', 'my-button-class', elements[0]);
	  button.textContent = 'Close control';
	  DomEvent.on(button, 'click', function(e){
	    DomEvent.stop(e);
	    this._collapse();
	  }, this);
	}

});

const createDeveloperControlComponent = () => {
  const instance = new Control.Developer({
  })

  return instance
}

export const DevControl = createControlComponent(createDeveloperControlComponent);