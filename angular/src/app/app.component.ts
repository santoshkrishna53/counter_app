import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { StorageServiceService } from './services/storage-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( public storageService : StorageServiceService) {}

  title = 'angular';
  new_counter_form : any;
  counters;

  ngOnInit(): void {

    // Initialize the form group for adding new counters
    this.new_counter_form = new FormGroup({
      counter_name: new FormControl(null,[Validators.required]),
      counter_value: new FormControl(null,[Validators.required]),
    });

    // Subscribe to changes in counters from the storage service
    this.storageService.counters.subscribe( counters => {
      this.counters = counters
    })
  }

  // Increment a counter and update it
  increment(counter: any){
    counter["count"] = counter["count"] + 1;
    this.update_counters();
  }

  // Decrement a counter (if it's greater than zero) and update it
  decrement(counter: any){
    if(counter["count"] && counter["count"] !=0 ){
    counter["count"] = counter["count"] - 1;
    this.update_counters();
    }
  }

  // Remove a counter by its index and update the counters
  remove_counter(index){
    this.counters.splice(index, 1);
    this.update_counters();
  }

  // Update counters both locally and on the backend
  update_counters(){
    this.storageService.set_counters({data : this.counters}).subscribe({next: res => {
      // Update the local storage with the latest counters
      localStorage.setItem("counters",JSON.stringify(this.counters))
    }, error: error => {
      alert("Failed to update counters")
    }})
  }

  // Reset the new counter form
  reset_form(){
    this.new_counter_form.get("counter_name").setValue(null)
    this.new_counter_form.get("counter_value").setValue(null)
  }

  // Add a new counter if the form is valid
  new_counter(){
    if(this.new_counter_form.valid){
      // Push a new counter object to the counters array
      this.counters.push(
        {"counter_name" : this.new_counter_form.value["counter_name"] , "count" : this.new_counter_form.value["counter_value"]}
      )

      // Update counters and reset the form
      this.update_counters();
      this.reset_form();
    }else{
      alert("please check counter form")
    }
  }
}
