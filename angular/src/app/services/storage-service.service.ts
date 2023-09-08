import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  // The URL of the backend API from environment configuration
  BACKEND_HOST = environment.backend_host

  // A BehaviorSubject to store and notify subscribers about counters
  counters =  new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
    // Initialize counters and set up a 'storage' event listener
    this.get_counters();

    window.addEventListener('storage', (event: StorageEvent) => {

      // Check if the storage change is related to counters
      if (event.key === 'counters') {

        // Update the counters BehaviorSubject with the new data
        this.counters.next(JSON.parse(localStorage.getItem("counters") || "[]") || [])
      }
    });
  }
  
  // Fetch counters from the backend
  get_counters(){
    this.http.get(`${this.BACKEND_HOST}/api/counters`).subscribe({next: res=> {

      // Store counters in local storage
      localStorage.setItem("counters",res["counters"])

      // Update the counters BehaviorSubject with the fetched data
      this.counters.next(JSON.parse(res["counters"]))
    }})
  }

  // Update counters on the backend
  set_counters(counters){
    return this.http.post(`${this.BACKEND_HOST}/api/counters`, counters)
  }
}
