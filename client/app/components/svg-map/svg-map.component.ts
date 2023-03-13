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
      minZoom: -2,
      maxZoom: 1,
      center : [2012.5, 3840],
      zoom   : -2
    });
    const width = 7680;
    const height = 4025;
    const sw = map.unproject([0, height], map.getMaxZoom() - 1);
    const nw = map.unproject([width, 0], map.getMaxZoom() - 1);
    const bounds = new L.LatLngBounds(sw, nw);
    const imageUrl = `assets/maps/png/Customs.png`;
    // @ts-ignore
    L.imageOverlay(imageUrl, bounds).addTo(map);
    // @ts-ignore
    map.setMaxBounds(bounds);
    const marker = L.latLng([2000, 3000]);
    L.marker(marker, {
      icon       : new Icon({iconUrl: 'assets/images/icons/gps-ping-icon.ico', iconSize: [50, 60]}
      ),
      title      : 'some title',
      riseOnHover: true
    }).addTo(map);
  }
}
