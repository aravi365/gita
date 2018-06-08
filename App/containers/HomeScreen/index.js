import React,{Component} from 'react'

import{ Alert,View,Text,Dimensions,AsyncStorage,TouchableOpacity,StatusBar} from 'react-native'
import CardSection from '../../components/CardSection'
import { Content,Container, Header,Body, Card, CardItem,Left,Button,Icon,Title,Right, Root} from 'native-base';
import SecondScreen from '../SecondScreen';

const { width, height } = Dimensions.get("window");
export default class HomeScreen extends Component{
state={
    token:null,
    chapters:null,
}
    setAccessToken=()=>{
        form = new FormData();
        form.append('client_id', 'jNbOITlhq5sKpV64M03UGNqTVViYTXngO2AD36bD');
        form.append('client_secret', 'GEH34IqNcsCmtN19JlOKMgd4Jp4ytBkhFovF0BgjWdarJ2w0Oz');
        form.append('grant_type', 'client_credentials');
        form.append('scope', 'verse chapter');
        fetch('https://bhagavadgita.io/auth/oauth/token',{
            method:'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                
                },
            body:form
        }).then(res=>{
            resJSON=res.json().then(result=>{
            //   JSON.stringify(result)
            console.log(result);
           
                this.setState({token:result.access_token})
                this.getChapters(result.access_token)
                AsyncStorage.setItem('access_token',JSON.stringify(result))
            })
            
        })
    }
    getChapters=(token)=>{
        fetch(`https://bhagavadgita.io/api/v1/chapters?access_token=${token}`).then(res=>{
            console.log(res)
            if(res.status==200){
            resJSON=res.json().then(result=>{
            //   JSON.stringify(result)
            this.setState({chapters:result})
        }).catch((err)=>{
            console.log(err)
        })
    }else{
        this.setAccessToken()
    }
            })
    }
    componentDidMount=()=>{
       console.log('dfhjgqfyj')
     AsyncStorage.getItem('access_token').then(res=>{
         if(res){
             try{
            //  console.log("token=",JSON.parse(res));
             let token = JSON.parse(res).access_token
             console.log("token=",token)
             this.setState({token})
             this.getChapters(token)
             }catch(err){
                this.setAccessToken() 
             }

         }else{
             this.setAccessToken()
         }
     }).catch(err=>{
        this.setAccessToken()


     })
       
    }

    render(){
        return(
         
            <Container>
                  <StatusBar backgroundColor='orange' />
           <Header style={{backgroundColor:'orange'}} androidStatusBarColor="orange">
          <Left>
            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{fontFamily:'SAM'}}>BhagavadGita</Title>
          </Body>
          <Right />
        </Header>
            <Content>
   
             
              {this.state.chapters&&  this.state.chapters.map(data =>(
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('SecondScreen',{data,token:this.state.token})}>
                   <Card key={data.chapter_number}>
                  <CardItem header>
                  <Text>{data.chapter_number}. {data.name.replace(/"/g,'')} |   {data.name_translation} | {data.verses_count}</Text>
                  </CardItem>
                  <CardItem>
              <Body>
                <Text>
                 {data.chapter_summary}
                </Text>
              </Body>
            </CardItem>
                  </Card>
                  </TouchableOpacity>
                  
              ))}
                
              
             
            </Content>
          </Container>
        )
    }
}