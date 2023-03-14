import {Component, Input}   from '@angular/core';
import {CommonModule}       from '@angular/common';
import {ProgressBarModule}  from 'primeng/progressbar';
import {TooltipModule}      from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MapInfoModel}       from '../../models/maps/maps.model';
import * as L               from 'leaflet';
import {Icon}               from 'leaflet';

@Component({
  selector   : 'app-svg-map',
  standalone : true,
  imports    : [CommonModule, ProgressBarModule, TooltipModule, OverlayPanelModule],
  templateUrl: './svg-map.component.html',
  styleUrls  : ['./svg-map.component.scss']
})
export class SvgMapComponent {
  private _mapInfo!: MapInfoModel;
  get mapInfo(): MapInfoModel {
    return this._mapInfo;
  }

  @Input() set mapInfo(value: MapInfoModel) {
    this._mapInfo = value;
    this.loadMap().then();
  }

  async loadMap(): Promise<void> {
    const map = L.map('map', {
      crs    : L.CRS.Simple,
      minZoom: -1,
      maxZoom: 0,
      center : [990, 1910],
    });
    const width = 3820;
    const height = 1980;
    const bounds = new L.LatLngBounds([0,0], [height, width]);
    const imageUrl = `assets/maps/Shoreline.png`;
    // @ts-ignore
    L.imageOverlay(imageUrl, bounds).addTo(map);
    // @ts-ignore
    map.setMaxBounds(bounds);
    map.fitBounds(bounds)
    const marker = L.latLng([990, 1910]);
    L.marker(marker, {
      icon       : new Icon({iconUrl: 'assets/images/icons/gps-ping-icon.ico', iconSize: [50, 60]}
      ),
      title      : 'Some title',
      riseOnHover: true
    }).addTo(map);
  }
}
