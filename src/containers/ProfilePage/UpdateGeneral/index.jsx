/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SimpleReactValidator from 'simple-react-validator';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import { witheProfileViewModel } from '../ProfileViewModel/ProfileViewModelContextProvider';
import Spinner from '../../../components/Spinner';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.scss';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import FormComponent from '../../../components/Form';
import SubmitButton from '../Layout/SubmitButton';
import { Storage } from 'aesirx-dma-lib';
import { withTranslation } from 'react-i18next';
import DamComponent from 'components/DamComponent';

const UpdateGeneral = observer(
  class UpdateGeneral extends Component {
    updateGeneralViewModel = null;
    formPropsData = {
      [UPDATE_GENERAL_FIELD_KEY.ID]: Storage.getItem('member_id'),
      [UPDATE_GENERAL_FIELD_KEY.USERNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM]: '',
      [UPDATE_GENERAL_FIELD_KEY.LOGO]: '',
      [UPDATE_GENERAL_FIELD_KEY.FULLNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.EMAIL]: '',
      [UPDATE_GENERAL_FIELD_KEY.BIRTHDAY]: '',
      [UPDATE_GENERAL_FIELD_KEY.PHONE]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]: '',
      [UPDATE_GENERAL_FIELD_KEY.ZIPCODE]: '',
      [UPDATE_GENERAL_FIELD_KEY.CITY]: '',
      [UPDATE_GENERAL_FIELD_KEY.STATE]: '',
      [UPDATE_GENERAL_FIELD_KEY.COUNTRY]: '',
      [UPDATE_GENERAL_FIELD_KEY.TIMEZONE]: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
      this.validator = new SimpleReactValidator();
      const { viewModel } = props;
      this.updateGeneralViewModel = viewModel ? viewModel.getUpdateGeneralViewModel() : null;
      this.updateGeneralViewModel.setAllValue(this);
      this.validateInfoBeforeSending = this.validateInfoBeforeSending.bind(this);
      this.handleDamAssets = this.handleDamAssets.bind(this);
      this.handleDamAssetsLogo = this.handleDamAssetsLogo.bind(this);
      this.updateGeneralViewModel.setForm(this);
    }

    componentDidMount() {
      this.updateGeneralViewModel.initializeData();
    }

    handleDamAssets(data) {
      this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM] = data[0].download_url;
    }
    handleDamAssetsLogo(data) {
      this.formPropsData[UPDATE_GENERAL_FIELD_KEY.LOGO] = data[0].download_url;
    }
    saveGeneralHandler = () => {
      this.updateGeneralViewModel.saveGeneralInformationOnPage();
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('password');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        this.setState({ loading: true });
        this.saveGeneralHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
    };

    generateFormSetting = () => {
      return [
        {
          fields: [
            {
              label: 'txt_Username',
              key: UPDATE_GENERAL_FIELD_KEY.USERNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.USERNAME],
              className: 'col-6',
              readOnly: true,
            },
            {
              label: 'txt_Email',
              key: UPDATE_GENERAL_FIELD_KEY.EMAIL,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.EMAIL],
              className: 'col-6',
              readOnly: true,
            },
            {
              label: 'txt_Status',
              key: 'status',
              type: FORM_FIELD_TYPE.INPUT,
              value: 'Active',
              classNameInput: 'text-success',
              className: 'col-6',
              readOnly: true,
            },
            {
              label: 'txt_Fullname',
              key: UPDATE_GENERAL_FIELD_KEY.FULLNAME,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] = event.target.value;
              },
            },
            {
              label: 'txt_Phone',
              key: UPDATE_GENERAL_FIELD_KEY.PHONE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE] = event.target.value;
              },
            },
            {
              label: 'txt_Birthday',
              key: UPDATE_GENERAL_FIELD_KEY.BIRTHDAY,
              type: FORM_FIELD_TYPE.BIRTHDAY,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.BIRTHDAY],
              defaultDate: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.BIRTHDAY],
              className: 'col-6',
              changed: (date) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.BIRTHDAY] =
                  date.getFullYear() +
                  '-' +
                  (parseInt(date.getMonth()) + 1) +
                  '-' +
                  date.getDate() +
                  ' 00:00:00';
              },
            },
            {
              label: 'txt_Address_1',
              key: UPDATE_GENERAL_FIELD_KEY.ADDRESS,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS] = event.target.value;
              },
            },
            {
              label: 'txt_Address_2',
              key: UPDATE_GENERAL_FIELD_KEY.ADDRESS_2,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2] = event.target.value;
              },
            },
            {
              label: 'txt_City',
              key: UPDATE_GENERAL_FIELD_KEY.CITY,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY] = event.target.value;
              },
            },
            {
              label: 'txt_State',
              key: UPDATE_GENERAL_FIELD_KEY.STATE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE] = event.target.value;
              },
            },
            {
              label: 'txt_Country',
              key: UPDATE_GENERAL_FIELD_KEY.COUNTRY,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY] = event.target.value;
              },
            },
            {
              label: 'txt_Zipcode',
              key: UPDATE_GENERAL_FIELD_KEY.ZIPCODE,
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE],
              className: 'col-6',
              changed: (event) => {
                this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE] = event.target.value;
              },
            },
          ],
        },
      ];
    };

    render() {
      const { t } = this.props;
      const { memberInfo } = this.updateGeneralViewModel;
      return (
        <>
          {!memberInfo ? (
            <Spinner />
          ) : (
            <div className="bg-white p-3 rounded-3">
              <div className="row">
                <FormComponent
                  formClassName={'col-9 row'}
                  generateFormSetting={() => this.generateFormSetting()}
                  formPropsData={this.formPropsData}
                  viewModel={this.updateGeneralViewModel}
                  key={Math.random(40, 200)}
                />
                <div className="col-3">
                  <label className="form-label mb-3">
                    <span className="text-blue-0">{t('txt_profile_picture')}</span>
                  </label>
                  <DamComponent
                    field={{
                      value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.AVATAR_DAM],
                      changed: this.handleDamAssets,
                    }}
                  />
                  <label className="form-label mt-4 mb-3">
                    <span className="text-blue-0">{t('txt_logo_picture')}</span>
                  </label>
                  <DamComponent
                    field={{
                      value: this.formPropsData[UPDATE_GENERAL_FIELD_KEY.LOGO],
                      changed: this.handleDamAssetsLogo,
                    }}
                  />
                </div>
                <SubmitButton validateInfoBeforeSending={this.validateInfoBeforeSending} />
              </div>
            </div>
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(witheProfileViewModel(UpdateGeneral));
