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
import java.io.IOException;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

/**
 * Created by andrzejchm on 30/04/16.
 */
public class RESTMockCallsRecorder {
  public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
  public static final String URL_FORMAT = "%snew";

  private final String url;
  private final Gson gson;
  private OkHttpClient okHttpClient;

  public RESTMockCallsRecorder(OkHttpClient okHttpClient, Gson gson, String url) {
    this.okHttpClient = okHttpClient;
    this.gson = gson;
    if(!url.startsWith("http")) {
      url = "http://"+url;
    }
    if(!url.endsWith("/")) {
      url = url+"/";
    }
    this.url = String.format(URL_FORMAT,url);
  }

  public void logRequestWithResponse(RecordedCall recordedCall) throws IOException {
    String body = gson.toJson(recordedCall);
    okHttpClient.newCall(
        new Request.Builder().post(RequestBody.create(JSON, body)).url(url).build()).execute();
  }
}
