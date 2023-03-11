import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule}                                           from '@angular/common';
import * as d3                                                  from 'd3';
import {QuestMapInfoModel}                                      from '../../models/quest/quest-map-info.model';
import {ProgressBarModule}                                      from 'primeng/progressbar';
import {TooltipModule}                                          from 'primeng/tooltip';
import {OverlayPanel, OverlayPanelModule}                       from 'primeng/overlaypanel';

@Component({
  selector   : 'app-svg-map',
  standalone : true,
  imports    : [CommonModule, ProgressBarModule, TooltipModule, OverlayPanelModule],
  templateUrl: './svg-map.component.html',
  styleUrls  : ['./svg-map.component.scss']
})
export class SvgMapComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  @Input() mapInfo!: QuestMapInfoModel;
  loading = true;
  markerOverlayContent: any;

  async ngAfterViewInit(): Promise<void> {
    this.loading = true;
    await this.loadMap();
  }

  onMarkerEnter($event: MouseEvent, op: OverlayPanel, index: number): void {
    this.markerOverlayContent = {
      objectiveName: this.mapInfo.objectives[index].completeString,
      floor        : this.mapInfo.objectives[index].gps?.floor
    };
    op.show($event);
  }

  private async loadMap(): Promise<void> {
    const element = this.container.nativeElement;
    const mapSvg = await d3.svg(`assets/maps/edites/${this.mapInfo.mapData.svg.file}`);
    this.loading = false;
    d3.select(element).selectAll('svg').remove();
    d3.select(element).node()?.append(mapSvg.documentElement);
    d3.select(element).select('svg').style('width', '100%');
    d3.select(element).select('svg').style('height', '100%');
  }
}
