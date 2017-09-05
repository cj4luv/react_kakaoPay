import React, { Component } from 'react';
import './App.css';

var IMP = window.IMP;

class App extends Component {

  /* =========================================================================================================================================================
   *
   * Device 체크 코드
   *
   * =========================================================================================================================================================
   */

  isMobile() {
    var UserAgent = navigator.userAgent;

    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
    {
      return true;
    }else{
      return false;
    }
  }

  checkedDevice(res) {
    if(this.isMobile()) {
    	window.location.href = res.next_redirect_mobile_url	//모바일페이지
    } else{
    	window.location.href = res.next_redirect_pc_url;		//PC용 페이지
    }
  }

  /* =========================================================================================================================================================
   *
   * Iamport 관련 코드
   *
   * =========================================================================================================================================================
   */

  requestPay() {
    IMP('iamport');
    IMP.request_pay({
        pg : 'inicis', // version 1.1.0부터 지원.
        pay_method : 'card',
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : '주문명:결제테스트',
        amount : 14000,
        buyer_email : 'iamport@siot.do',
        buyer_name : '구매자이름',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456',
        m_redirect_url : 'https://www.yourdomain.com/payments/complete'
    }, (rsp) => {
        let msg = '';
        if ( rsp.success ) {
            msg = '결제가 완료되었습니다.';
            msg += '고유ID : ' + rsp.imp_uid;
            msg += '상점 거래ID : ' + rsp.merchant_uid;
            msg += '결제 금액 : ' + rsp.paid_amount;
            msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
            msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
        }
        alert(msg);
    });
  }

  // REST API사용을 위한 인증(access_token취득)
  getIamportToken() {
    fetch('/iamport')
    .then(res => res.json())
    .then(res => this.setState({
        token: res.access_token,
    },()=>{
      this.getCertifications(this.state.token);
    }));
  }

  // SMS본인인증결과 조회 및 관리 (get)
  getCertifications(token) {
    fetch('iamport', {
      method:'POST',
      headers: {
        'Authorization': token,
        'Accept': 'application/json',
        'Content-type':'application/json',
      },
      body: JSON.stringify({
        imp_uid:'imp_911965406846',
        access_token: token,
      })
    })
    .then((res) => res.json())
    .then(res => console.log(res))
    .catch((res) => { console.log(res) })
  }

  /* =========================================================================================================================================================
   *
   * 카카오페이 관련 코드
   *
   * =========================================================================================================================================================
   */

  onKaKaoPay() {
    fetch('/kakaoPay')
    .then(res =>res.json())
    .then(res=>{
      this.checkedDevice(res)
    });
  }

  render() {
    return (
      <div className="App">
        <img src={require('./img/kakaoPay.png')} onClick={()=>{this.onKaKaoPay()}} alt='kakaoPay'/>
        <img src={require('./img/iamport.svg')} onClick={()=>this.requestPay()} alt='iamport' />
      </div>
    );
  }
}

export default App;
