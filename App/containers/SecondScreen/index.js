import React, { Component } from 'react'

import { View, Text, StatusBar, AsyncStorage, Alert } from 'react-native'
import { Content, Container, Header, Body, Card, CardItem, Left, Button, Icon, Title, Right, Root } from 'native-base';
export default class SecondScreen extends Component {
    state = {
        data: this.props.navigation.state.params.data,
        token: this.props.navigation.state.params.token,
        versus: null
    }



    getVerses = async (token) => {
        let res = await fetch(`https://bhagavadgita.io/api/v1/chapters/${this.state.data.chapter_number}/verses?access_token=${token}`)
        resJSON = await res.json()
        // Alert.alert(resJSON[0].meaning
        this.setState({ versus: resJSON })

    }
    componentDidMount = () => {
        this.getVerses(this.state.token)
    }
    render() {

        return (
            <Container>
                 <Content>
                <StatusBar backgroundColor='orange' />
                <Header style={{ backgroundColor: 'orange' }} androidStatusBarColor="orange">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: 'Kruti_Dev_100' }}>{this.state.data.name.replace(/"/g, '')}</Title>
                    </Body>
                    <Right />
                </Header>

                {this.state.versus && this.state.versus.map(verse => (
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Body>
                                <Text>{verse.meaning}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                ))}
               




                </Content>
            </Container>
        )
    }
}