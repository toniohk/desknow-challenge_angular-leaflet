import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient) {
  }

  async getHostsData(): Promise<Observable<Object>> {
    return this.http.get('http://localhost:3000/api/hosts');
  }

  async getBookingsData(): Promise<Observable<Object>> {
    return this.http.get('http://localhost:3000/api/bookings');
  }

  async makeCapitalMarkers(map: L.Map): Promise<void> {
    (await this.getHostsData()).subscribe((res: any) => {
      res.forEach((item: { coordinates: any; }) => {
        const coordinates = item.coordinates;
        const marker = L.circleMarker([coordinates[0], coordinates[1]]);

        marker.addTo(map);
      });
    });

    (await this.getBookingsData()).subscribe((res: any) => {
      res.forEach((item: { coordinate: any; }) => {
        const coordinate = item.coordinate;
        const marker = L.marker([coordinate.latitude, coordinate.longitude]);

        marker.addTo(map);
      });
    });
  }
}