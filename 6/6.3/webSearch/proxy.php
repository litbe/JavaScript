<?php
/* ----------------------------------------------------------
* 定数定義
* -------------------------------------------------------- */
/* リクエスト先URLの定義 */
define("REQ_BASE_URL", "http://api.search.yahoo.co.jp/WebSearchService/V1/webSearch?appid=[アプリケーションID]");

/* ライブラリのディレクトリ */
define("ZEND_LIB_DIR", "../library/");

/* HTTPリクエストのタイムアウト（秒） */
define("HTTP_TIMEOUT", 10);

/* ----------------------------------------------------------
* メイン
* -------------------------------------------------------- */

main();

function main() {
	/* Zendフレームワークライブラリのディレクトリをインクルードパスに追加 */
	ini_set("include_path", ZEND_LIB_DIR.PATH_SEPARATOR.ini_get("include_path"));
	/* HTTPリクエスト送り、結果を取得する */
	$context = httpRequest();
	/* HTTPレスポンスから内容を出力する */
	printContent($context);
}

/* ----------------------------------------------------------
* HTTPリクエスト送り、結果を取得する
* -------------------------------------------------------- */
function httpRequest() {
	/* パラメータを取得し、URLを構成する */
	$params = array();
	foreach( $_GET as $key => $value ) {
		$pair = $key . "=" . urlencode($value);
		array_push($params, $pair);
	}
	$url = REQ_BASE_URL;
	if( strpos($url, "?") === false ) {
		$url .= "?";
	} else {
		$url .= "&";
	}
	$url .= implode("&", $params);
	/* HTTPリクエスト */
	$context = array();
	require_once('Zend/Http/Client.php');
	try {
		// クライアントオブジェクトのインスタンスを作成
		$http = new Zend_Http_Client($url, array('timeout' => HTTP_TIMEOUT));
		// リクエスト送信
		$response = $http->request();
		// レスポンス取得
		$context['code'] = $response->getStatus();
		$context['msg'] = $response->getMessage();
		$context['headers'] = $response->getHeaders();
		if ($response->isSuccessful()) {
			$context['body'] = $response->getBody();
		} else {
			$context['err'] = 'HTTP通信に失敗しました。'.$context['code'].':'.$context['msg'];
		}
	} catch (Zend_Http_Client_Exception $e) {
		$context['err'] = 'HTTP通信に失敗しました。(' .$e->getMessage(). ')';
	}
	return $context;
}

/* ----------------------------------------------------------
* HTTPレスポンスから内容を出力する
* -------------------------------------------------------- */
function printContent($context) {
	if( isset($context['err']) ) {
		header("Content-Type: text/plain; charset=utf-8");
		echo '[ERROR] ' . $context['err'];
	} else {
		$headers = $context['headers'];
		if( isset($headers['Content-type']) ) {
			header("Content-Type: " . $headers['Content-type']);
		} else {
			header("Content-Type: text/plain; charset=utf-8");
			echo '[ERROR] ' . 'Content-Typeが判定できませんでした。';
		}
		if( isset($headers['Content-length']) ) {
			header("Content-Length: " . $headers['Content-length']);
		}
		echo $context['body'];
	}
}
?>