import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {LeafLeftMapSetup, MapInfoModel} from '../../models/maps/maps.model';
import * as Leaflet from 'leaflet';
import {Icon, LatLngExpression, Map} from 'leaflet';

@Component({
  selector   : 'app-svg-map',
  standalone : true,
  imports    : [CommonModule, ProgressBarModule, TooltipModule, OverlayPanelModule],
  templateUrl: './svg-map.component.html',
  styleUrls  : ['./svg-map.component.scss']
})
export class SvgMapComponent {
  private leafletMap?: Map;
  private _mapInfo!: MapInfoModel;
  get mapInfo(): MapInfoModel {
    return this._mapInfo;
  }

  @Input() set mapInfo(value: MapInfoModel) {
    this._mapInfo = value;
    this.loadMap(value.leafletSetup);
  }

   private loadMap(mapSetup: LeafLeftMapSetup): void {
    if(this.leafletMap){
      this.removeMap(this.leafletMap);
    }
    const map = Leaflet.map('map', {
      crs    : Leaflet.CRS.Simple,
      minZoom: mapSetup.minZoom,
      maxZoom: mapSetup.maxZoom,
      center : mapSetup.center as LatLngExpression,
    });
    const bounds = new Leaflet.LatLngBounds([0,0], [mapSetup.heightPx, mapSetup.widthPx]);
    const imageUrl = `assets/maps/${mapSetup.fileName}`;
    Leaflet.imageOverlay(imageUrl, bounds).addTo(map);
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
    this.leafletMap = map;
  }

  private createMarkers(map: Map): void {
    const markerPos = Leaflet.latLng([0,0]);
    const icon = new Icon({iconUrl: 'assets/images/icons/gps-ping-icon.ico', iconSize: [50, 60]})
    const marker = Leaflet.marker(markerPos, {
      icon: icon
    }).addTo(map);
    marker.bindTooltip("<h1>my tooltip text</h1> <br> <p>other text</p>");
  }

  private removeMap(map: Map): void {
    map.remove();
  }
}
