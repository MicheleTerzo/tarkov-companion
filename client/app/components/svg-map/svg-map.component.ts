import {Component, Input, OnDestroy}    from '@angular/core';
import {CommonModule}                   from '@angular/common';
import {ProgressBarModule}              from 'primeng/progressbar';
import {TooltipModule}                  from 'primeng/tooltip';
import {OverlayPanelModule}             from 'primeng/overlaypanel';
import {LeafLeftMapSetup, MapInfoModel} from '../../models/maps/maps.model';
import * as Leaflet                     from 'leaflet';
import {Icon, Map, Marker}              from 'leaflet';
import {Subject, takeUntil}             from 'rxjs';
import {MapsService}                    from '../../services/maps.service';
import {QuestObjectiveModel}            from '../../models/quest/quest-objective.model';
import {QuestModel}                     from '../../models/quest/quest.model';
import {TRADERS}                        from '../../utils/enums';

@Component({
  selector   : 'app-svg-map',
  standalone : true,
  imports    : [CommonModule, ProgressBarModule, TooltipModule, OverlayPanelModule],
  templateUrl: './svg-map.component.html',
  styleUrls  : ['./svg-map.component.scss']
})
export class SvgMapComponent implements OnDestroy {
  private leafletMap?: Map;
  private mapMarkers: Marker[] = [];
  private destroy$ = new Subject<void>();
  private readonly traders = TRADERS

  constructor(private mapsService: MapsService) {
  }

  private _mapInfo!: MapInfoModel;
  get mapInfo(): MapInfoModel {
    return this._mapInfo;
  }

  @Input() set mapInfo(value: MapInfoModel) {
    this._mapInfo = value;
    this.loadMap(value.leafletSetup);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMap(mapSetup: LeafLeftMapSetup): void {
    if (this.leafletMap) {
      this.removeMap(this.leafletMap);
    }
    const map = Leaflet.map('map', {
      crs    : Leaflet.CRS.Simple,
      minZoom: mapSetup.minZoom,
      maxZoom: mapSetup.maxZoom,
      center : mapSetup.center
    });
    const bounds = new Leaflet.LatLngBounds([0, 0], [mapSetup.heightPx, mapSetup.widthPx]);
    const imageUrl = `assets/maps/${mapSetup.fileName}`;
    Leaflet.imageOverlay(imageUrl, bounds).addTo(map);
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
    this.leafletMap = map;
    this.listenToQuestsUpdate();
  }

  private listenToQuestsUpdate(): void {
    this.mapsService.quests$.pipe(takeUntil(this.destroy$)).subscribe(quests => {
      this.removeMarkers();
      quests.forEach(quest => {
        quest.objectives.forEach(obj => {
          if (obj.location === this.mapInfo.id && obj.gps) {
            this.createMarkers(obj, quest);
          }
        });
      });
    });
  }

  private createMarkers(obj: QuestObjectiveModel, quest: QuestModel): void {
    const markerPos = Leaflet.latLng(obj.gps!);
    const icon = new Icon({iconUrl: 'assets/images/icons/target.png', iconSize: [40, 40]});
    const marker = Leaflet.marker(markerPos, {
      icon: icon
    }).addTo(this.leafletMap!);
    this.mapMarkers.push(marker);
    this.createTooltip(marker, quest, obj);
  }

  private removeMarkers(): void {
    this.mapMarkers.forEach(marker => marker.removeFrom(this.leafletMap!));
  }

  private createTooltip(marker: Marker, quest: QuestModel, obj: QuestObjectiveModel): void {
    marker.bindTooltip(`<h2>${quest.title}</h2> <h3>${this.traders[quest.giver]}</h3> <p>${obj.completeString}</p>`);
  }

  private removeMap(map: Map): void {
    map.remove();
  }
}
