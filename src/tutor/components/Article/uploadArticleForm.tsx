import React from 'react'
import UploadArticleModal from './uploadArticleModal'
function uploadArticleForm() {
    
  return (
      <UploadArticleModal isOpen={false}  CloseModal={}>
          <h1>The upload article modal</h1>
      </UploadArticleModal>
  )
}

export default uploadArticleForm
