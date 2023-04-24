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
    const {title} = this.route.snapshot.data['userData'];
    this.title.setTitle(title);

  }
}
