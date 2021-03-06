import React, { useState, useEffect } from 'react';
import { Rate } from 'antd'
import ProductUserReviewModal from './ProductUserReviewModal'


function ProductReview(props) {

  const [showReviewModal, setshowReviewModal] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() =>{
    //Axios
    if(props.detail && props.detail.review){
      let reviews = [];
      props.detail.review.map( item => {
        let date = new Date(item.date);
        let month = props.getZero(date.getMonth()+1);
        let day = props.getZero(date.getDate());
        let hours = props.getZero(date.getHours());
        let min = props.getZero(date.getMinutes())
        reviews.push({
          writer: item.writer,
          review: item.review,
          date: `${date.getFullYear()}-${month}-${day} ${hours}:${min}:${date.getSeconds()}`,
          rate: item.rate,
          like: item.like
        })
      })
      setReviewList(reviews)
      console.log(reviews.length)
    }
  },[props.detail])

    const inputReview = () => {
      setshowReviewModal(true);
    }

    const ReviewUploadHandler = () => {
      console.log("ok")
      setshowReviewModal(false);
    }

    const showReviewCancel = (event) => {
        if(event.target.className === "popup-layer" || event.target.className === "btn_close"){
            setshowReviewModal(false);
        }
    }

    //리뷰 등록 후 새로고침
    const reviewRefresh = (newReview) => {
      //console.log("reviewRefresh : "+ props.detail.review[0].rate)
      console.log("reviewRefresh"+newReview)
      let reviews = [];
      newReview.review.map( item => {
        let date = new Date(item.date);
        let month = props.getZero(date.getMonth()+1);
        let day = props.getZero(date.getDate());
        let hours = props.getZero(date.getHours());
        let min = props.getZero(date.getMinutes())
        reviews.push({
          writer: item.writer,
          review: item.review,
          date: `${date.getFullYear()}-${month}-${day} ${hours}:${min}:${date.getSeconds()}`,
          rate: item.rate,
          like: item.like
        })
      })
      setReviewList(reviews)
      setshowReviewModal(false);
    }



  return (
    <div style={{marginLeft: '10%', marginRight: '10%'}}>
        <h1>レビュー {reviewList && reviewList.length}</h1>
        <br />
        {/* <button>오스스메순</button>
        <button>신착순</button> */}
        <button onClick={inputReview}>レビュー登録</button>
        <br />
        <hr />

        <div>
            {reviewList && reviewList.map( (item,index) => (
                <>
                <Rate disabled  defaultValue={item.rate} />
                <pre key={index}>{item.review}</pre>
                <br />
                <div style={{display:'flex'}}>
                    <p style={{paddingRight:'1.8em'}}>{item.writer}</p>
                    <p>{item.date}</p>
                    {/* <p>추천</p>
                    <button onClick={reviewRefresh}>추천버튼</button> */}
                </div>
                <hr />
                </>
            ))}
        </div>

        

        {showReviewModal &&
            <ProductUserReviewModal detail={props.detail} cancel={showReviewCancel} submit={reviewRefresh} />
        }

    </div>
  );
}

export default ProductReview;