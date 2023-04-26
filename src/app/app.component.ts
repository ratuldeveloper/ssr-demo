import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public title: Title,private route: ActivatedRoute) {

  }
  ngOnInit() {
    
    const {name = ''} = this.route.snapshot.data?.userData?.personalInfo || {};
    this.title.setTitle(name);

  }
}
