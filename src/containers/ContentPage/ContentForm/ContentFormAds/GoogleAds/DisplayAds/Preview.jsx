import React from 'react';
import { observer } from 'mobx-react';
import ComponentImage from '../../../../../../components/ComponentImage';

const DisplayAdsPreview = observer(({ previewData }) => {
  console.log('DisplayAdsPreview render', previewData);

  return (
    <div className="d-flex flex-column border-1 rounded p-3">
      <div className="card">
        {previewData?.square_image && (
          <div className="mb-3">
            <ComponentImage
              src={previewData?.square_image ? previewData?.square_image[0]?.url : null}
              className="card-img-top"
              alt={previewData?.square_image ? previewData?.square_image[0]?.url : null}
            />
          </div>
        )}
        <div className="card-body">
          <h5 className="card-title">{previewData.headline ?? 'Headline'}</h5>
          <p className="card-text">{previewData.description ?? 'Description'}</p>
          <p className="text-muted">{previewData.businessName ?? 'Business name'}</p>
        </div>
      </div>
    </div>
  );
});

export default DisplayAdsPreview;
