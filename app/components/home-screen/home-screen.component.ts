// NativeScript objects

// Angular 2 objects
import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

// Components
import {DetoxComponent} from '../detox/detox.component';

// Services
import {DetoxService} from '../../services/detox.service';
var applicationSettings = require("application-settings");


@Component({
  selector:'home-screen-component',
  template:`
<ActionBar title="Quotox">
    <ActionItem text="Detox" (tap)="detox_screen()" ios.position="right"></ActionItem>
</ActionBar>

  <StackLayout>
     <Label text="Quote of the day" class="quote_of_day" textWrap="true"></Label>
     <Label [text]="quote_of_day" class="quote" textWrap="true"></Label>
     <Label text="{{days_clean_text}}" class="days_clean" textWrap="true"></Label>
     <!-- <Button class="detox-btn" text="Get Detoxes" (tap)="get_detoxes()"></Button> -->
  </StackLayout>

  `,
  styleUrls:["./components/home-screen/home-screen.css"],
  directives:[DetoxComponent],
  providers:[DetoxService]
})
export class HomeScreenComponent implements OnInit {
    public quote_of_day: string;
    public last_time:any;
    public today:any = new Date();
    public days_clean:number;
    public days_clean_text:string;
    public detoxes:any;
    public detox_comp:any;

    constructor(private router: Router, private detox_service:DetoxService){
      this.get_detoxes();
    }

    ngOnInit(){
      this.quote_of_day = "A Lion doesn't concern himself with the opinion of a sheep.";

    }

    detox_screen(){
      this.router.navigate(["/"]);
    }

    get_detoxes(){
      var detoxes = this.detox_service.get_detoxes();
      return detoxes.then((detoxes) => {
        this.detoxes = detoxes[detoxes.length-1].last_time;
        var last_time = this.detoxes.split('-');
        this.last_time = new Date(last_time[0],last_time[1]-1,last_time[2]);
        console.log(this.last_time);
        this.days_clean = Math.floor(((this.today - this.last_time)/(864*Math.pow(10,5))));
        console.log(this.days_clean);
        this.days_clean_text = this.days_clean+" "+ "days free of alcohol";

        // this.days_clean_date(this.detoxes);
      });
    }

    days_clean_date(last_time){
      // var last_time = last_time.split("-");
      // this.last_time = new Date(last_time[0],last_time[1]-1,last_time[2]);
      // this.days_clean = Math.floor(((this.today - this.last_time)/(864*Math.pow(10,5))));
    }

}
