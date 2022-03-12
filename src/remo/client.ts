/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  id?: Id;
  nickname?: string;
}

export type Devices = Device[];

export interface Device {
  id?: Id;
  name?: string;
  temperature_offset?: number;
  humidity_offset?: number;
  created_at?: DateTime;
  updated_at?: DateTime;
  firmware_version?: string;
  mac_address?: string;
  serial_number?: string;

  /** @example {"te":{"val":0,"created_at":"2020-09-10T06:03:58.213Z"},"hu":{"val":0,"created_at":"2020-09-10T06:03:58.213Z"},"il":{"val":0,"created_at":"2020-09-10T06:03:58.213Z"},"mo":{"val":1,"created_at":"2020-09-10T06:03:58.213Z"}} */
  newest_events?: {
    te?: SensorValue;
    hu?: SensorValue;
    il?: SensorValue;
    mo?: SensorValue;
  };
}

export interface DeviceCore {
  id?: Id;
  name?: string;
  temperature_offset?: number;
  humidity_offset?: number;
  created_at?: DateTime;
  updated_at?: DateTime;
  firmware_version?: string;
  mac_address?: string;
  serial_number?: string;
}

export interface Appliance {
  id?: Id;
  device?: DeviceCore;
  model?: ApplianceModel;
  nickname?: string;

  /**
   * Basename of the image file included in the app. Ex: "ico_ac_1"
   *
   */
  image?: Image;

  /** Type of the appliance. "AC" (Air conditioner), "TV" and "LIGHT" are 1st class citizen appliance, which is included in our IRDB (InfraRed signals DataBase). The "ApplianceModel" stores meta data about the appliance. We provide AC specific UI. Everything else is "IR". We just learn the signals from the remote and store them, and when users tap the button on the smartphone app, our server sends it through Remo. */
  type?: ApplianceType;
  settings?: AirConParams;
  aircon?: AirCon;
  signals?: Signal[];
  tv?: TV;
  light?: LIGHT;
  smart_meter?: SmartMeter;
}

export interface AirConParams {
  /** The temperature in string format. The unit is described in Aircon object. The range of Temperatures which the air conditioner accepts depends on the air conditioner model and operation mode. Check the 'AirConRangeMode' information in the response for the range of the particular air conditioner model and operation mode. */
  temp?: Temperature;

  /** The range of OperationModes which the air conditioner accepts depends on the air conditioner model. Check the 'AirConRangeMode' information in the response for the range of the particular air conditioner model. */
  mode?: OperationMode;

  /** Empty means automatic. Numbers express the amount of volume. The range of AirVolumes which the air conditioner accepts depends on the air conditioner model and operation mode. Check the 'AirConRangeMode' information in the response for the range of the particular air conditioner model and operation mode. */
  vol?: AirVolume;

  /** Empty means automatic. */
  dir?: AirDirection;

  /** Specify "power-off" always if you want the air conditioner powered off. Empty means powered on. */
  button?: ACButton;
}

export interface AirCon {
  range?: {
    modes?: {
      cool?: AirConRangeMode;
      warm?: AirConRangeMode;
      dry?: AirConRangeMode;
      blow?: AirConRangeMode;
      auto?: AirConRangeMode;
    };
    fixedButtons?: ACButton[];
  };
  tempUnit?: '' | 'c' | 'f';
}

export interface AirConRangeMode {
  temp?: Temperature[];
  vol?: AirVolume[];
  dir?: AirDirection[];
}

export interface Signal {
  id?: Id;
  name?: string;

  /**
   * Basename of the image file included in the app. Ex: "ico_ac_1"
   *
   */
  image?: Image;
}

export interface ApplianceModel {
  id?: Id;
  manufacturer?: string;
  remote_name?: string;
  name?: string;

  /**
   * Basename of the image file included in the app. Ex: "ico_ac_1"
   *
   */
  image?: Image;
}

export interface ApplianceModelAndParam {
  model?: ApplianceModel;
  params?: AirConParams;
}

/**
 * Type of the appliance. "AC" (Air conditioner), "TV" and "LIGHT" are 1st class citizen appliance, which is included in our IRDB (InfraRed signals DataBase). The "ApplianceModel" stores meta data about the appliance. We provide AC specific UI. Everything else is "IR". We just learn the signals from the remote and store them, and when users tap the button on the smartphone app, our server sends it through Remo.
 */
export enum ApplianceType {
  AC = 'AC',
  TV = 'TV',
  LIGHT = 'LIGHT',
  IR = 'IR',
}

/**
 * @format uuid
 */
export type Id = string;

/**
 * Basename of the image file included in the app. Ex: "ico_ac_1"
 */
export type Image = string;

/**
 * @format date-time
 */
export type DateTime = string;

/**
 * The range of OperationModes which the air conditioner accepts depends on the air conditioner model. Check the 'AirConRangeMode' information in the response for the range of the particular air conditioner model.
 */
export enum OperationMode {
  Type = '',
  Cool = 'cool',
  Warm = 'warm',
  Dry = 'dry',
  Blow = 'blow',
  Auto = 'auto',
}

/**
 * The temperature in string format. The unit is described in Aircon object. The range of Temperatures which the air conditioner accepts depends on the air conditioner model and operation mode. Check the 'AirConRangeMode' information in the response for the range of the particular air conditioner model and operation mode.
 */
export type Temperature = string;

/**
 * Empty means automatic. Numbers express the amount of volume. The range of AirVolumes which the air conditioner accepts depends on the air conditioner model and operation mode. Check the 'AirConRangeMode' information in the response for the range of the particular air conditioner model and operation mode.
 */
export enum AirVolume {
  Type = '',
  Auto = 'auto',
  Type1 = '1',
  Type2 = '2',
  Type3 = '3',
  Type4 = '4',
  Type5 = '5',
  Type6 = '6',
  Type7 = '7',
  Type8 = '8',
  Type9 = '9',
  Type10 = '10',
}

/**
 * Empty means automatic.
 */
export enum AirDirection {
  Type = '',
}

/**
 * Specify "power-off" always if you want the air conditioner powered off. Empty means powered on.
 */
export enum ACButton {
  Type = '',
  PowerOff = 'power-off',
}

/**
* The reference key to SensorValue means "te" = temperature, "hu" = humidity, "il" = illumination, "mo" = movement.
The val of "mo" is always 1 and when movement event is captured created_at is updated.
*/
export interface SensorValue {
  /** @format float */
  val?: number;
  created_at?: DateTime;
}

export interface TV {
  state?: TVState;
  buttons?: Button[];
}

export interface LIGHT {
  state?: LIGHTState;
  buttons?: Button[];
}

export interface Button {
  /** Name of button. It is used for "POST /1/{applaince}/tv" and "POST /1/{appliance}/light". */
  name?: string;

  /**
   * Basename of the image file included in the app. Ex: "ico_ac_1"
   *
   */
  image?: Image;

  /** Label of button. */
  label?: string;
}

export interface TVState {
  input?: 't' | 'bs' | 'cs';
}

export interface LIGHTState {
  brightness?: string;
  power?: 'on' | 'off';
  last_button?: string;
}

export interface SmartMeter {
  echonetlite_properties?: EchonetLiteProperty[];
}

/**
* The ECHONET lite properties fetched from the appliance.
See "Detailed Requirements for ECHONET Device Objects" for more details.
ref. https://echonet.jp/spec_object_rl_en/
*/
export interface EchonetLiteProperty {
  name?: string;

  /** ECHONET Property */
  epc?: number;
  val?: string;
  updated_at?: DateTime;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://api.nature.global';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`,
    )}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Nature API
 * @version 1.0.0
 * @baseUrl https://api.nature.global
 *
 * Read/Write Nature Remo
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * @description Fetch the authenticated user's information.
     *
     * @name UsersMeList
     * @request GET:/1/users/me
     * @secure
     */
    usersMeList: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/1/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update authenticated user's information.
     *
     * @name UsersMeCreate
     * @request POST:/1/users/me
     * @secure
     */
    usersMeCreate: (data: { nickname: string }, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/1/users/me`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fetch the list of Remo devices the user has access to.
     *
     * @name DevicesList
     * @request GET:/1/devices
     * @secure
     */
    devicesList: (params: RequestParams = {}) =>
      this.request<Devices, any>({
        path: `/1/devices`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Find the air conditioner best matching the provided infrared signal.
     *
     * @name DetectapplianceCreate
     * @request POST:/1/detectappliance
     * @secure
     */
    detectapplianceCreate: (
      data: { message: string },
      params: RequestParams = {},
    ) =>
      this.request<ApplianceModelAndParam[], any>({
        path: `/1/detectappliance`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fetch the list of appliances.
     *
     * @name AppliancesList
     * @request GET:/1/appliances
     * @secure
     */
    appliancesList: (params: RequestParams = {}) =>
      this.request<Appliance[], any>({
        path: `/1/appliances`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new appliance.
     *
     * @name AppliancesCreate
     * @request POST:/1/appliances
     * @secure
     */
    appliancesCreate: (
      data: {
        nickname: string;
        model?: string;
        model_type?: 'AC' | 'TV' | 'LIGHT';
        device: string;
        image: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Appliance, any>({
        path: `/1/appliances`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reorder appliances.
     *
     * @name ApplianceOrdersCreate
     * @request POST:/1/appliance_orders
     * @secure
     */
    applianceOrdersCreate: (
      data: { appliances: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/appliance_orders`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Delete appliance.
     *
     * @name AppliancesDeleteCreate
     * @request POST:/1/appliances/{appliance}/delete
     * @secure
     */
    appliancesDeleteCreate: (appliance: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/1/appliances/${appliance}/delete`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Update appliance.
     *
     * @name AppliancesCreate2
     * @request POST:/1/appliances/{appliance}
     * @originalName appliancesCreate
     * @duplicate
     * @secure
     */
    appliancesCreate2: (
      appliance: string,
      data: { nickname: string },
      params: RequestParams = {},
    ) =>
      this.request<Appliance, any>({
        path: `/1/appliances/${appliance}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update air conditioner settings.
     *
     * @name AppliancesAirconSettingsCreate
     * @request POST:/1/appliances/{appliance}/aircon_settings
     * @secure
     */
    appliancesAirconSettingsCreate: (
      appliance: string,
      data: {
        temperature?: string;
        operation_mode?: string;
        air_volume?: string;
        air_direction?: string;
        button?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/appliances/${appliance}/aircon_settings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Send tv infrared signal.
     *
     * @name AppliancesTvCreate
     * @request POST:/1/appliances/{appliance}/tv
     * @secure
     */
    appliancesTvCreate: (
      appliance: string,
      data: { button: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/appliances/${appliance}/tv`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Send light infrared signal.
     *
     * @name AppliancesLightCreate
     * @request POST:/1/appliances/{appliance}/light
     * @secure
     */
    appliancesLightCreate: (
      appliance: string,
      data: { button: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/appliances/${appliance}/light`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Fetch signals registered under this appliance.
     *
     * @name AppliancesSignalsDetail
     * @request GET:/1/appliances/{appliance}/signals
     * @secure
     */
    appliancesSignalsDetail: (appliance: string, params: RequestParams = {}) =>
      this.request<Signal[], any>({
        path: `/1/appliances/${appliance}/signals`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a signal under this appliance.
     *
     * @name AppliancesSignalsCreate
     * @request POST:/1/appliances/{appliance}/signals
     * @secure
     */
    appliancesSignalsCreate: (
      appliance: string,
      data: { name: string },
      params: RequestParams = {},
    ) =>
      this.request<Signal, any>({
        path: `/1/appliances/${appliance}/signals`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reorder signals under this appliance.
     *
     * @name AppliancesSignalOrdersCreate
     * @request POST:/1/appliances/{appliance}/signal_orders
     * @secure
     */
    appliancesSignalOrdersCreate: (
      appliance: string,
      data: { signals: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/appliances/${appliance}/signal_orders`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Update infrared signal.
     *
     * @name SignalsCreate
     * @request POST:/1/signals/{signal}
     * @secure
     */
    signalsCreate: (
      signal: string,
      data: { name: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/signals/${signal}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Delete an infrared signal.
     *
     * @name SignalsDeleteCreate
     * @request POST:/1/signals/{signal}/delete
     * @secure
     */
    signalsDeleteCreate: (signal: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/1/signals/${signal}/delete`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Send infrared signal.
     *
     * @name SignalsSendCreate
     * @request POST:/1/signals/{signal}/send
     * @secure
     */
    signalsSendCreate: (signal: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/1/signals/${signal}/send`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Update Remo
     *
     * @name DevicesCreate
     * @request POST:/1/devices/{device}
     * @secure
     */
    devicesCreate: (
      device: string,
      data: { name: string },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/devices/${device}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Delete Remo.
     *
     * @name DevicesDeleteCreate
     * @request POST:/1/devices/{device}/delete
     * @secure
     */
    devicesDeleteCreate: (device: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/1/devices/${device}/delete`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Update temperature offset.
     *
     * @name DevicesTemperatureOffsetCreate
     * @request POST:/1/devices/{device}/temperature_offset
     * @secure
     */
    devicesTemperatureOffsetCreate: (
      device: string,
      data: { offset: number },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/devices/${device}/temperature_offset`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Update humidity offset.
     *
     * @name DevicesHumidityOffsetCreate
     * @request POST:/1/devices/{device}/humidity_offset
     * @secure
     */
    devicesHumidityOffsetCreate: (
      device: string,
      data: { offset: number },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/1/devices/${device}/humidity_offset`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
}
