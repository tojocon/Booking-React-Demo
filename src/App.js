import React, { Component } from 'react';
import ReactDOM, {} from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Popup from 'react-popup';
import  $ from 'jquery';
import {   } from 'jquery-ui';
import Stand1photo from './stand1.jpg';
import Stand2photo from './stand2.jpg';
import Stand3photo from './stand3.jpg';
import { AppRegistry, View, Image } from 'react-native';
//import { Popover, Modal, Button, Dialog } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        
          <h2>Welcome to Virtual Expositions</h2>
        </div>
        <p className="App-intro">
          To get started, please select a virtual expo hall below.
        </p>
        <WorldMap/>
      
      </div>
    );
  }
}


class WorldMap extends Component {
  render() {
    return (
      <div className="WorldMap">
        <div id="mapcontainer">
			<ExpoHall className='expoA' title="Expo A" expolocation="Paldere" eventdates="5/2/2017" top="200px" left="150px" style={{position:'absolute',top:'300px',left:'100px'}}/>
			<ExpoHall className='expoB' title="Expo B" expolocation="Renvitts" eventdates="6/22/2017" top="400px" left="150px"  style={{top:'140px',left:'600px'}} />
	
        </div>
   
      </div>
    );
  }
  
  
}

class ExpoHall extends Component {
	
	
	constructor(props) {
		  super(props);
		  this.setstate = {
		   isToggleOn:false,
		   style:{
				  top: '260px',
				  left: '260px'
				}
		  };
	  
	}  

	
	handleclick = function(expotitle,expolocation,expodates) {
    
		//alert ("click handled"+expotitle+"loc="+expolocation);		
		
		ReactDOM.render(
		  <ExpoDetails  title={expotitle} expoloc={expolocation} expodt={expodates} />,
		 document.getElementById('expodetails')
		);
		
  }
  
  componentDidMount(){
	  this.setstate = {
		   isToggleOn:false,
		   style:{
				  top: '260px',
				  left: '260px'
				}
		  };
  }

	
  render() {
    return (
      <div className="ExpoHall" ref="child" onClick={this.handleclick.bind(this, this.props.title,this.props.expolocation,this.props.eventdates)}  >
       <p> {this.props.title}</p>
       
      </div>
    );
  }
}



class ExpoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

	}
	
	handleclick = function(){
		//alert("load the expo hall map");
		ReactDOM.render(
		  <ExpoHallMap  title={this.props.title} expoloc={this.props.expoloc} expodt={this.props.expodt} />,
		 document.getElementById('root')
		);
		
		ReactDOM.render(
		  <br />,
		 document.getElementById('expodetails')
		);
	}
	
	render() {
		return (
		  <div className="ExpoDetails" >
		   <p><b>Details for {this.props.title}</b></p>
		   <p>Expo location: <b>{this.props.expoloc}</b></p>
		    <p>Event Dates: <b>{this.props.expodt}</b></p> 
		   <button onClick={this.handleclick.bind(this)}>Book your place</button>
		  </div>
		);
  }
	
 }
 
 
 
 class ExpoHallMap extends Component {
  render() {
    return (
      <div className="ExpoHallMap">
      <h3>{this.props.title} - {this.props.expoloc} - {this.props.expodt}</h3>
        <div id="mapcontainer">
			<Stand title="Stand1" eventdates={this.props.expodt} booked={false} style={{top:'300px',left:'100px'}}/>
			<Stand title="Stand2" eventdates={this.props.expodt} booked={false} style={{top:'140px',left:'600px'}} />
			<Stand title="Stand3" eventdates={this.props.expodt} booked={false} style={{top:'240px',left:'300px'}} />
			
        </div>
   
      </div>
    );
  }
}
 
 
class Stand extends Component {
	
	constructor(props) {
	  super(props);
	   this.state = {booked: this.props.booked? true:false};
	 
	}  

	loadBookedStatus() {
		  
		  var passabledate=this.props.eventdates;
		  if (this.props.eventdates.indexOf('/') >-1){
			var date_parts=this.props.eventdates.split('/');
			passabledate=date_parts[2]+'-'+date_parts[1]+'-'+date_parts[0];
			}
		  //**** must allow Cors in Apache2.config to debug in npm port 3000 
		var theurl='http://localhost/index.php/standstatus/index/'+this.props.title+'/'+passabledate;
		  $.ajax({
		  url: theurl,
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
		
			this.setState({booked:data.booked});
		  }.bind(this),
		  error: function(xhr, status, err) {
			console.error(theurl, status, err.toString());
		  }.bind(this)
		});
	  }



   componentDidMount(){
	   
	  this.loadBookedStatus(); //state is set in here
		  
  }



	handleclick = function(standtitle, eventdates, booked) {
    

		if( booked < 1){ 
			ReactDOM.render(
			  <StandDetails  title={standtitle} eventdates={eventdates}  />,
			 document.getElementById('expodetails')
			);
		}else{
			alert ("That stand is booked already.");
		}
		
  }
	
  render() {
    return (
      <div className="Stand"  onClick={this.handleclick.bind(this, this.props.title,  this.props.eventdates,this.state.booked)}  >
       {this.props.title}-  { this.state.booked ? <p><b>Booked</b></p> : <p><b>Empty</b></p> }
      <br/>
      
      </div>
    );
  }
}

class StandDetails extends Component {
	
	constructor(props) {
	  super(props);
	  
	 
	}  

	handleclick = function(standtitle,eventdates) {
     
        if (eventdates.indexOf('/') >-1){
			var date_parts=eventdates.split('/');
			eventdates=date_parts[2]+'-'+date_parts[1]+'-'+date_parts[0];
		}
       
        var theurl='http://localhost/index.php/register/index/'+standtitle+'/'+eventdates;
        console.log("going to: "+theurl);
		location.href=theurl;

  }
	
  render() {
	  

	 var usephoto=this.props.title+'photo'; 
    return (
      <div className="StandDetails" >
       <p>Stand ID: {this.props.title}</p>
         <View>
          <Image
          source={require('./stand2.jpg')}
        />
          </View>
       <p><img src={Stand1photo} className="StandDetailsImage"/></p>
       
       <button onClick={this.handleclick.bind(this, this.props.title,this.props.eventdates)}> Reserve</button>
      
      </div>
    );
  }
}

 
 

 
 
 
export default App;
