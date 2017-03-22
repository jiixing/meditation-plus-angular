import { Component } from '@angular/core';


@Component({
  selector: 'wiki',
  templateUrl: './wiki.component.html',
  styleUrls: [
    './wiki.component.styl'
  ]
})

export class WikiComponent {
  videoUrl: string;

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  play(evt) {
    if (!evt.node.data || !evt.node.data.videoId) {
      return;
    }

    this.videoUrl = 'https://www.youtube.com/embed/' + evt.node.data.videoId + '?autoplay=1';
  }

  stop(evt) {

  }
}
