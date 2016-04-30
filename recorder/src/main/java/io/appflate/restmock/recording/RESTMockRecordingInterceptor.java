/*
 * Copyright (C) 2016 Appflate.io
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.appflate.restmock.recording;

import com.google.gson.Gson;
import io.appflate.restmock.recording.model.RecordedCall;
import io.appflate.restmock.recording.model.RecordedRequest;
import io.appflate.restmock.recording.model.RecordedResponse;
import java.io.IOException;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * Created by andrzejchm on 30/04/16.
 */
public class RESTMockRecordingInterceptor implements Interceptor {
  private final RESTMockCallsRecorder restMockCallsRecorder;

  public RESTMockRecordingInterceptor(String url) {
    this.restMockCallsRecorder = new RESTMockCallsRecorder(new OkHttpClient(), new Gson(), url);
  }

  @Override public Response intercept(Chain chain) throws IOException {
    Request okRequest = chain.request();
    RecordedRequest recordedRequest =
        new RecordedRequest(okRequest.method(), okRequest.url().toString());

    Response response = chain.proceed(okRequest);

    ResponseBody responseBody = response.body();
    String responseBodyString = responseBody.string();
    Response newResponse =
        recreateResponseWithBody(response, responseBody.contentType(), responseBodyString);
    RecordedResponse recordedResponse = new RecordedResponse(responseBodyString);
    try {
      restMockCallsRecorder.logRequestWithResponse(
          new RecordedCall(recordedRequest, recordedResponse));
    } catch(Throwable t) {
      System.out.println(t);
    }
    return newResponse;
  }

  private Response recreateResponseWithBody(Response response, MediaType contentType,
      String responseBodyString) {
    return response.newBuilder()
        .body(ResponseBody.create(contentType, responseBodyString.getBytes()))
        .build();
  }
}
