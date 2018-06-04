import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MarkDown from './MarkDown.jsx';


import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, Progress } from 'antd';

const { Content } = Layout;

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class Settings extends React.Component {
  render() {
  	const { getFieldDecorator } = this.props.form;
  	let userData = this.props.user;
  	let customPercent = (userData.currentSize/userData.maxSize)*100;
    return (
    	<Layout>
    		<Content style={{ margin: '24px 16px 0', marginTop: 0, height: '100%' }}>
		        <div style={{ padding: 24, background: '#fff', height: '100%' }}>
			        <Row type="flex" justify="space-around" align="middle">
				      <Col span={10}>
				      	<div>
			         		<p>Занято пространства <span style={{color: 'red'}}>{userData.currentSize}</span>/<span style={{color: 'green'}}>{userData.maxSize}</span> Мегабайт</p>
			        		<Progress percent={customPercent} format={percent => `${parseInt(percent)}%`} />
			        	</div>
			        	<Form>
					        <FormItem
					 
					          label="Ваше имя"
					        >
					            <Input type="text" defaultValue={userData.name} />
					        </FormItem>
					        <FormItem
					     
					          label="Ваша фамилия"
					        >
					         
					            <Input type="text" defaultValue={userData.surname} />

					        </FormItem>

					        <FormItem
					    
					          label="Ваш новый пароль"
					        >
					          
					            <Input type="password"  />
				
					        </FormItem>

					        <FormItem
					    
					          label="Подтвердите новый пароль"
					        >
					          
					            <Input type="password"  />
				
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
						            <Input type="password" />
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
