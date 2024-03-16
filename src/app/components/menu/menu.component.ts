import { Component } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'}
    ],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [
          {name: 'Pumpkins',
          children: [
            {name: 'Pumpkins'},
            {name: 'Carrots',
            children: [
              {name: 'Pumpkins'},
              {name: 'Carrots'}
            ]}
          ]},
          {name: 'Carrots'}
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  //This control manages the nested tree structure of the data
  //It takes a function node => node.children which defines how to get the children of a given node in the tree.
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);

  //This is the data source for the material tree component.
  //It holds the data that will be displayed in the tree.
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }


  //This function is used to determine if a given node has children or not.
  //This function is used by the material tree component to display expand/collapse icons for nodes with children.
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
