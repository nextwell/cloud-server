import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios';

import { store } from './../store/store.jsx';

import MarkDown from './MarkDown.jsx';

import { fetchUser } from './../actions/actionUser.jsx';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Progress, message } from 'antd';

const { Content } = Layout;

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class Settings extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		    confirmDirty: false,
		    autoCompleteResult: [],
	    };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
	      	if (!err) {
	        	axios.post('/settings', values )
				  .then(function (response) {
				      let data = response.data;
				      if ( data.type == 'error' ){
				      	  message.error(`${data.msg}`, 5);
				      }
				      else {
				      	  store.dispatch(fetchUser('/api/user'));
				      	  message.success(`${data.msg}`, 5);
				      }
				   })
				  .catch(function (error) {
				      console.log(error);
				  });
	      	}
	    });
	}
	validateToNextPassword(rule, value, callback) {
	    const form = this.props.form;
	    if (value && this.state.confirmDirty) {
	      	form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	}




  render() {
  	const { getFieldDecorator } = this.props.form;
  	let userData = this.props.user.data; 
    return (
    	<Layout>
    		<Content style={{ margin: '24px 16px 0', marginTop: 0, height: '100%' }}>
		        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
			        <Row type="flex" justify="space-around" align="middle">
				      <Col span={10}>
			        	<Form onSubmit={this.handleSubmit}>
					        <FormItem
					 
					          label="Ваше имя"
					        >
					        	{getFieldDecorator('name', {initialValue: userData.name} )(
						            <Input type="text" name="name" />
						        )}
					            
					        </FormItem>
					        <FormItem
					     
					          label="Ваша фамилия"
					        >
					        	{getFieldDecorator('surname', {initialValue: userData.surname} )(
						            <Input type="text" name="surname" />
						        )}

					        </FormItem>

					        <FormItem
					    
					          label="Ваш новый пароль"
					        >
					        	{getFieldDecorator('new_password')(
						            <Input type="password" name="new_password" />
						        )}
					          
				
					        </FormItem>

					        <FormItem
					    
					          label="Подтвердите новый пароль"
					        >

					        	{getFieldDecorator('new_password_2')(
						            <Input type="password" name="new_password_2" />
						        )}
					          
				
					        </FormItem>

					        <FormItem
					    
					          label="Ваш текущий пароль"
					        >
					          
					            {getFieldDecorator('password', {
							            rules: [{
							              required: true, message: 'Введите ваш старый пароль!',
							            }, {
							              validator: this.validateToNextPassword,
							            }],
						            })(
						            <Input type="password" name="old_password"/>
						        )}
				
					        </FormItem>
					       
					        <FormItem>
					          <Button type="primary" htmlType="submit">Сохранить</Button>
					        </FormItem>
					      </Form>
			       

				      </Col>
				    </Row>
				  </div>
		         	
		    </Content>
		    <MarkDown />
    	</Layout>
      
    );
  }
}

const SettingsForm = Form.create()(Settings);

function mapStateToProps(state) {
	return {
		user: state.user
	};
}


export default connect(mapStateToProps)(SettingsForm)
