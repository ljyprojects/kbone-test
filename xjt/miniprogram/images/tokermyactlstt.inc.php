<?php 
    global $_W, $_GPC;
    $sid = $this->sid;   
          $query = load()->object('query');
    	if(!$_W['isajax']){///////////如果是刷新页面
			  $actcard=$query->from('ewei_shop_article_category')->where(array('isshow'=>1,'uniacid in'=>array($_W['uniacid'],1)))->orderby('displayorder', 'DESC')->getall();//分类
			  $fen=$this->users['headimgurl'];
			  if (substr($fen,0,4)=="http") {
				$fenimg=$fen;
			  }else{
				$fenimg=httptype().$_SERVER['HTTP_HOST'].$fen;
			  }
			  //$top=$query->from('ewei_shop_article')->where(array('uniacid'=>$_W['uniacid']))->orderby('article_date', 'DESC')->select('id','article_date','resp_img','article_category','article_title','article_zhuannum','article_readnum')->get();
			  $tops=explode("|",  $top['resp_img']);         
			  include $this->template('toker/myactlstt');
        }else{////////////////// 如果是点击分类  
			$page=$_GPC['page'];
			$cid=$_GPC['cid'];
			  $where=array('article_state !='=>0,'article_category !='=>0,'uniacid in'=>array($_W['uniacid'],1),'article_title !='=>'0');
			if ($cid!=-1) {
				$where['article_category']=$cid;
			}
			if ($_GPC['id']) {
				$where['id !=']=$_GPC['id'];
			}
				  $lsts = $query->from('ewei_shop_article')->where($where)->page($page, 10)->orderby('article_date','DESC')->select('id','article_date','resp_img','article_category','article_title','article_zhuannum','article_readnum')->getall();
			  foreach ($lsts as $k => $v) {
				if (substr($lsts[$k]['resp_img'],0,4)<>"http") {					
					$lsts[$k]['resp_img']="http://kzq.oss-cn-shenzhen.aliyuncs.com/" . $v['resp_img'];
				}
				$lsts[$k]['imgs']=explode("|", $v['img']);
				$lsts[$k]['fen']=pdo_getcolumn('ewei_shop_article_category',array('id'=>$v['article_category']),'category_name');
				$lsts[$k]['fabiao']=$v['article_date'];
			  }
		      echo json_encode($lsts);
        }/////////////
 ?>