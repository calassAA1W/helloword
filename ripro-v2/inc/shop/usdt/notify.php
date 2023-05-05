<?php

/**
 * epay异步通知
 */

header('Content-type:text/html; Charset=utf-8');
date_default_timezone_set('Asia/Shanghai');
ob_start();
require_once dirname(__FILE__) . "../../../../../../../wp-load.php";
ob_end_clean();
if (empty($_GET)) {exit;}
$hjyusdtConfig = _cao('usdt');


//var_dump($hjyusdtConfig);
if (empty($hjyusdtConfig['appid']) || empty($hjyusdtConfig['token'])) {
    exit('no');
}
$jg=xy($_GET);
if ($jg) {
    // 处理本地业务逻辑
    if ($_GET['zt'] == 'SUCCESS') {
        //商户本地订单号
        $out_trade_no = $_GET['ddh'];
        //易支付交易号
        $trade_no = $_GET['fromuser'];
        //发送支付成功回调用
        $RiClass = new RiClass;
        $RiClass->send_order_trade_notify($out_trade_no, $trade_no);
        echo 'ok';exit();
    }
    echo 'no';exit();

} else {
    //验证失败
    echo "no";exit();
}
 function xy($data1){
    $hjyusdtConfig = _cao('usdt');
    $token=$hjyusdtConfig['token'];
    $data = array(
        "appid" => $data1['appid'],//你的支付ID
        "ddh" => $data1['ddh'], //唯一标识 可以是用户ID,用户名,session_id(),订单ID,ip 付款后返回
        "money" => $data1['money'],//金额
        "note" => $data1['note'],//自定义参数
        "name" => $data1['name'],//产品名称
        "fromuser"=> $data1['fromuser'],//付款方
        "transaction_id"=> $data1['transaction_id'],//转账id
        "zt"=> $data1['zt'],//付款状态
        "paytime"=> $data1['paytime'],//付款时间
    ); //构造需要传递的参数
    ksort($data); //重新排序$data数组
    reset($data); //内部指针指向数组中的第一个元素
    $sign = ''; //初始化需要签名的字符为空
    $urls = ''; //初始化URL参数为空
    foreach ($data AS $key => $val) { //遍历需要传递的参数
        if ($val == ''||$key == 'sign') continue; //跳过这些不参数签名
        if ($sign != '') { //后面追加&拼接URL
            $sign .= "&";
            $urls .= "&";
        }
        $sign .= "$key=$val"; //拼接为url参数形式
    }

    if(empty($token)){
        return false;
    }
    //echo $sign."<br><br>";
    // echo $sign."<br>";
    $jmsign=md5($sign.$token);
    $fhsign=$data1['sign'];
    //echo "这里是对比:获取的".$fhsign."-----现在加密的".$jmsign."<br>".md5($sign.$token)."<br>".$sign.$token."<br>";
    //die;
    if($fhsign==$jmsign){

        return true;
    }
    return false;
}