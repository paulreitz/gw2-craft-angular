import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { RecipeService } from '../../../services/recipe.service';
import { NodeModel } from '../../../models/node.model';
import { ItemModel } from '../../../models/item.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, AfterViewInit {

  root: NodeModel;
  label: string = "";
  containerWidth:number = 10;
  containerHeight: number = 10;
  containerLeft: number = 0;
  containerTop: number = 0;

  constructor(
    private recipeService: RecipeService
  ){}

  ngOnInit() {
    this.root = this.recipeService.getRootNode();
    this.label = this.root.getItem().name.replace("&lsquo;", "'");
  }

  ngAfterViewInit() {
    this.buildTree();
  }

  private buildTree() {
    var w = this.root.getBreadth() || 1;
    var h = this.root.getDepth() || 1;
    w *= 200;
    h *= 200;
    this.containerWidth = w;
    this.containerHeight = h;

    var data = this.root.getDetails();

    var treemap = d3.tree().size([w, h]);
    var nodes = d3.hierarchy(data, (d) => {
      return d.children;
    });
    nodes = treemap(nodes);

    var svg = d3.select("#tree-canvas").append("svg")
      .attr("width", w + 50)
      .attr("height", h + 50);

    var g = svg.append("g");

    var link = g.selectAll(".link")
          .data(nodes.descendants().slice(1))
          .enter().append("path")
          .attr("class", "link")
          .style("stroke", (d) => { return d.data.level; })
          .attr("d", (d:any) => {
              return "M" + d.x + "," + d.y
              + "C" + (d.x + d.parent.x) / 2 + "," + d.y
              + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y
              + " " + d.parent.x + "," + d.parent.y;
          });

    var node = g.selectAll(".node")
          .data(nodes.descendants())
          .enter().append("g")
          .attr("class", (d:any) => {
              if (!d.parent) {
                var center = document.getElementById("tree-wrapper").clientWidth / 2
                  document.getElementById("tree-wrapper").scrollLeft = (d.x - center);
              }
              return "node" + (d.children? " node-internal" : " node-leaf");
          })
          .attr("transform", (d:any) => {
              return "translate(" + d.x + "," + d.y + ")";
          });

      node.append("rect")
          .attr("x", (d:any) => { return d.data.width / 2 * -1;})
          .attr("y", 0)
          .attr("width", (d:any) => { return d.data.width; })
          .attr("height", 34)
          .attr("style", (d:any) => {
              return "fill:white;stroke-width:3;stroke:black";
          });
      
      node.append("svg:image")
          .attr("x", (d:any) => { return d.data.width / 2 * -1; })
          .attr("y", 1)
          .attr("width", 32)
          .attr("height", 32)
          .attr("xlink:href", (d:any) => { return d.data.item.icon; });

      node.append("text")
          .attr("x", (d:any) => { return (d.data.width / 2 * -1) + 34; })
          .attr("y", 18)
          .style("text-anchor", "left")
          .attr("class", "dark-text")
          .text((d:any) => { return d.data.item.name.replace("&lsquo;", "'"); });

  }

}
