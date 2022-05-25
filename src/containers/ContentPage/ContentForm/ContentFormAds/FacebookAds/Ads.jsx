import React, { useContext, lazy } from 'react';
import Button from '../../../../../components/Button';
import { ContentViewModelContext } from '../../../ContentViewModels/ContentViewModelContextProvider';

import Preview from './Preview';
import { observer } from 'mobx-react';
import useValidator from '../../../../../utils/simpleValidator';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { CONTENT_FIELD_KEY } from '../../../../../constants/ContentModule';
import { CHANNEL_ADS_GOOGLE } from '../../../../../constants/ChannelModule';

const TrafficAds = lazy(() => import('./TrafficAds'));

const Ads = observer((props) => {
  const contentContext = useContext(ContentViewModelContext);
  const viewModel = contentContext.getFormAdsViewModel();

  const [validator, showValidationMessage] = useValidator();

  const previewData = viewModel.previewData;

  const getAdsFormat = (format) => {
    switch (format) {
      default:
        return <TrafficAds validator={validator} />;
    }
  };

  const handleNext = () => {
    props.formPropsData[CONTENT_FIELD_KEY.ADS] = viewModel.formPropsData;
    if (validator.allValid()) {
      props.nextStep();
    } else {
      showValidationMessage(true);
    }
  };

  const handlePrevious = () => {
    console.log('handlePrevious', props.formPropsData);
    props.formPropsData[CONTENT_FIELD_KEY.ADS] = viewModel.formPropsData;
    viewModel.parentPreviousStep();
  };

  console.log('Ads render', viewModel);

  return (
    <>
      <div className="row">
        <div className="col-5">{getAdsFormat()}</div>
        <div className="col-7">
          <Preview previewData={previewData} />
        </div>
      </div>

      <div className="d-flex justify-content-between border-top-1 pt-3">
        <Button
          className="btn btn-light border-success "
          onClick={handlePrevious}
          text="Back"
          icon={faChevronLeft}
        />

        <Button className="btn btn-success px-4 mw-80" onClick={handleNext} text="Next" />
      </div>
    </>
  );
});

export default Ads;
