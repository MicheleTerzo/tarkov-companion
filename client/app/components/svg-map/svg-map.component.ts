import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule}                            from '@angular/common';
import {ProgressBarModule}                       from 'primeng/progressbar';
import {TooltipModule}                           from 'primeng/tooltip';
import {OverlayPanelModule}                      from 'primeng/overlaypanel';
import {MapInfoModel}                            from '../../models/maps/maps.model';
import * as L                                    from 'leaflet';

@Component({
  selector   : 'app-svg-map',
  standalone : true,
  imports    : [CommonModule, ProgressBarModule, TooltipModule, OverlayPanelModule],
  templateUrl: './svg-map.component.html',
  styleUrls  : ['./svg-map.component.scss']
})
export class SvgMapComponent {
  @ViewChild('container') container!: ElementRef;
  loading = true;
  markerOverlayContent: any;
  private _mapInfo!: MapInfoModel;
  get mapInfo(): MapInfoModel {
    return this._mapInfo;
  }

  @Input() set mapInfo(value: MapInfoModel) {
    this._mapInfo = value;
    this.loading = true;
    this.loadMap().then();
  }

  /*onMarkerEnter($event: MouseEvent, op: OverlayPanel, index: number): void {
   this.markerOverlayContent = {
   objectiveName: this.mapInfo.objectives[index].completeString,
   floor        : this.mapInfo.objectives[index].gps?.floor
   };
   op.show($event);
   }*/

  /*private async loadMap(): Promise<void> {
   const element = this.container.nativeElement;
   d3.select(element).selectAll('svg').remove();
   const mapSvg = await d3.svg(`assets/maps/edites/${this.mapInfo.svg.file}`);
   d3.select(element).node()?.append(mapSvg.documentElement);
   d3.select(element).select('svg').style('width', '100%');
   d3.select(element).select('svg').style('height', '100%');
   this.loading = false;
   }*/
  async loadMap(): Promise<void> {
    this.loading = false;
    const map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -10
    });
    const imageUrl = `assets/maps/CustomsLargeExpansionGloryMonki.png`;

    L.imageOverlay(imageUrl, [[0,0], [1080, 1920]]).addTo(map);
    map.fitBounds([[0,0], [1080, 1920]]);
  }
}
