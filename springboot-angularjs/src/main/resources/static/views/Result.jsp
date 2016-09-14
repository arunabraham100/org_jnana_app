<div class="row">
<div class="col-md-9" style="background-color:white;border-right: 1px solid black;">

 <div class="row">
<div class="col-md-12">
        <br><br>
            <div id="custom-search-input">
                <div class="input-group col-md-12" style="padding-right: 21px; padding-bottom: 12px; margin-top: -22px;">
                    <input type="text" class="form-control input-lg" ng-model="searchtag" placeholder="Search" />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" style="font-size: 18px !important;" type="button" ng-click="resultValidateReload()" >
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>         
      </div>
      </div>
     <br>
   <div dir-paginate="item in documents|orderBy:'-count'|itemsPerPage:7" ng-if='item.count!=0'  current-page="currentPage" id="paginate">  
      
     <div class="row">
     <div class="col-md-6">
     <span style="text-decoration: underline; color:blue !important;"> <a href="" ng-click="openDoc(item.url)" ><b>{{item.fileName}}</b></a></span>
     </div>
    
     <div class="star-rating col-md-4"  star-ratings rating-value=item.avgRating data-max="5"></div>
    
     <div class="col-md-2">
     <a  data-target="#" data-ng-click="showDetails(item.fileName,item.fileSize,item.author,item.avgRating,item.rateCount)" class="btn btn-success btn-lg" style="font-size:10px !important;">
      <span class="glyphicon glyphicon-preview"></span>Preview</a>
     </div>
     </div>  
     <div class="row">
     <div class="col-md-10">
     <div ng-bind-html="highlight(item.sentence,searchVal)" class="text-primary" style="font-size: 12px;"></div>     
     </div>
     </div>
    

<div class="row">
<div class="col-md-2">
  <span style="font-size: 12px !important;">Doc Type: {{item.fileType}}</span>
  </div>
  
  <div class="col-md-3">
  <span style="font-size: 12px !important;">No of Occurances:  {{item.count}}</span>
  </div>
  
  <div class="col-md-2" >
  <span style="font-size: 12px !important;">Bookmark</span>
          <button-bookmark></button-bookmark>
          </div>
          
          
  <div class="col-md-5"  style="text-align: right;">
  <span style="font-size: 12px !important;"> Rate-</span>
 <!--  <span  star-rating style="width:80px;" rating="starRating3" ng-click='saveRating(starRating3,item.fileName)' mouse-hover="mouseHover3(param)" mouse-leave="mouseLeave3(param)">
  </span>{{starRating3}} -->
  <span class="star-rating" star-rating rating-value='rating' data-max="5" on-rating-selected='saveRating(rating,item.fileName)'></span>
  </div> 

<hr color="grey" style="height:1px;">
 </div>
</div>
 <p><dir-pagination-controls   max-size="5" direction-links="true" boundary-links="true" ></dir-pagination-controls></p>
<br>

    <div class="row">
    <div class="col-md-12">
    <footer  data-ng-init="openopt($event, 'wordcloud')">

<div id="div1">
<ul class="nav nav-tabs" style="background-color: cadetblue !important;">
  <li class="col-md-4" style="text-align: center;"><a data-target="#"  class="tablinks act"  ng-click="openopt($event, 'links')">Related Links</a></li>
  <li class="active col-md-4" style="text-align: center;"><a data-target="#"    class="tablinks" ng-click="openopt($event, 'wordcloud')">Related Cloud</a></li>
  <li class="col-md-4" ><a data-target="#"  class="tablinks" ng-click="openopt($event, 'hierarchy')">Hierarchy Structure</a></li>
</ul>
<div id="links" class="tabcontent" style="height: 160px !important;">
  
  <p><a href="#"> Lorel Ipsum</a> <a href="#" style="margin-left:35px"> Amet Legere Percluis</a> <a href="#" style="margin-left:35px"> Ne nam tantas bonur</a> <br><br> <a href="#" style="margin-left:35px"> Mazem placerat</a> <a href="#" style="margin-left:35px"> Te Integre Labitur</a></p>
</div>


<!-- <div id='wordcloud' class="tabcontent"style="width: 846px;height: 150px;display: block;"></div> -->

 <!-- <div  style="width: 846px;height: 150px;display: block;"> -->
 <div id="wordcloud"  class="tabcontent">
<tang-cloud words="words" on-click="test(word)"></tang-cloud>
</div>
<div id="hierarchy" class="tabcontent" style="height: 150px; !important">
  
  <eu-tree tree-data="roleList" node-id="roleId" node-name="roleName" node-state="expand" 
  expand-icon="http://cfile23.uf.tistory.com/image/205B973A50C13F4B19D9BD" 
  collapse-icon="http://cfile23.uf.tistory.com/image/1459193A50C13F4B1B05FB"
   child-icon="http://cfile23.uf.tistory.com/image/165B663A50C13F4B196CCA"></eu-tree>
  
</div>

</div>

</footer>
</div>
</div>  
  
 </div> 


<div class="col-md-3">
 <div ng-show="myVal">
    
    <div><span><img src=" http://www.junior-broker.com/files/userfiles/images/9.7a%20Cisco%20WebEx%20Meetings%20icon.png" style="height: 39px; margin-right: 2px;"/>
                     <p style="font-size: 14px !important;">{{nameLatest}}</p> </span></div>
   
    <br>
    <div style="margin-top: -23px;">
    <p class="txtDeco text-primary">Author : {{Author}}</p>
    <p style="color: dimgray;">{{fileSiz}}</p>
    </div>
    <div>
    <p style="color: dimgray;">Lorem ipsum?dolor sit amet, consectetur adipiscing elit. Si quidem, inquit, tollerem, sed relinquo. Quae animi affectio suum cuique tribuens atque han
    </p>
    </div>
    <div>
   
   <div class="star-rating" star-rating rating-value=avgRate data-max="5"></div>
  <span>
 <p style="color: dimgray; margin-left: 8px; font-size: 15px !important">( {{rateCounts}} Users)</p>
  </span>
    </div>
    <h5 style="color: dimgray; margin-top: 15px !important;">WebEx Recording Preview</h5>
    
    <div style="clear:both" >
          </div>
            <div id="video" ></div>
   
    
    </div>
    </div>
    </div>
    

