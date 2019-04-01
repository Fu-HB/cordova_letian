# cordova_letian
vue+cordova混合开发安卓版
## build
AndroidApp的打包流程大致分为 build , sign , align 三部分。
1. build
  ` cordova build android --release `
2. sign
  ` keytool -genkey -v -keystore release-key.keystore -alias cordova-keystore -keyalg RSA -keysize 2048 -validity 10000 `
3. align
 ` jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore android-applatforms/android/build/outputs/apkk/android-release-unsigned.apk cordova-keystore `
4. apk的压缩和优化由上传至应用宝的时候进行，需要重新签名和压缩优化,以上是第一次进行release的命令
 ` cordova build android --release -- --keystore="release-key.keystore" --alias=cordova-keystore --storePassword=fhb18979687252 --password=fhb18979687252 `
5. 使用腾讯的LEGU加固然软件进行加固

----
## Cordova 打包 Android release app 过程详解

[Cordova 安卓开发打包详解](https://segmentfault.com/a/1190000005177715)

Android app 的打包分为 debug 和 release 两种，后者是用来发布到应用商店的版本。这篇文章会告诉你 Cordova 如何打包 Android release 版本，也会让你了解 Android app 的打包流程。

## 创建一个 demo app

为了演示，首先我们需要创建一个 Cordova 项目的基本步骤。如果你已经对此很熟悉，可以跳过这一步。

先全局安装 Cordova CLI ：
npm install -g cordova

在 cordova-demo 目录创建一个项目，ID 为 com.example.cordovaDemo ，项目名为 cordovaDemo 。
cordova create cordova-demo com.example.cordovaDemo cordovaDemo

加上 Android 平台，这会下载一个 Android 项目的框架，并把版本信息保存到 config.xml 。你可以去 platforms/android 目录下查看它。
cordova platform add android --save

你可以检查下平台需求是否满足。基本上 Cordova 需要你把 Java SDK， Android SDK 和 Gradle 都配置好。
cordova requirements android

现在一个 Cordova 项目就已经准备好了。你可以尝试构建一个版本。一切顺利的话，你会在 platforms/android/build/outputs/apk 目录下看到 APK 文件。这个目录后面会经常用到，为了方便我们建立一个符号链接 android-apk 。

构建 apk
cordova build android

建立符号链接 android-apk
ln -s platforms/android/build/outputs/apk android-apk

查看一下这个目录，你应该会看到 android-debug-unsigned.apk
ls android-apk
搞定！但这个构建的 APK 是 debug 版本的。要构建 release 版本，我们需要先了解一下 Android 手动打包的流程。

Android APK 手动打包流程

Android app 的打包流程大致分为 build , sign , align 三部分。

build是构建 APK 的过程，分为 debug 和 release 两种。release 是发布到应用商店的版本。

sign是为 APK 签名。不管是哪一种 APK 都必须经过数字签名后才能安装到设备上，签名需要对应的证书（keystore），大部分情况下 APK 都采用的自签名证书，就是自己生成证书然后给应用签名。

align是压缩和优化的步骤，优化后会减少 app 运行时的内存开销。

debug 版本的的打包过程一般由开发工具（比如 Android Studio）自动完成的。开发工具在构建时会自动生成证书然后签名，不需要我们操心。而 release 版本则需要开发者自己生成证书文件。Cordova 作为 hybrid app 的框架不像纯 Android 开发那么自动化，所以第一次打 release 包我们需要了解一下手动打包的过程。

Build

首先，我们生成一个 release APK 。这点在 cordova build 命令后加一个 --release 参数局可以。如果成功，你可以在 android-apk 目录下看到一个 android-release-unsigned.apk 文件。

cordova build android --release
Sign

我们需要先生成一个数字签名文件（keystore）。这个文件只需要生成一次。以后每次 sign 都用它。

keytool -genkey -v -keystore release-key.keystore -alias cordova-demo -keyalg RSA -keysize 2048 -validity 10000
上面的命令意思是，生成一个 release-key.keystore 的文件，别名（alias）为 cordova-demo 。

过程中会要求设置 keystore 的密码和 key 的密码。我们分别设置为 testing 和 testing2 。这四个属性要记牢，下一步有用。

然后我们就可以用下面的命令对 APK 签名了：

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore release-key.keystore android-apk/android-release-unsigned.apk cordova-demo
这个命令中需要传入证书名 release-key.keystore ，要签名的 APK android-release-unsigned.apk ，和别名 cordova-demo 。签名过程中需要先后输入 keystore 和 key 的密码。命令运行完后，这个 APK 就已经改变了。注意这个过程没有生成新文件。

Align

最后我们要用 zipalign 压缩和优化 APK ：

zipalign -v 4 android-apk/android-release-unsigned.apk android-apk/cordova-demo.apk
这一步会生成最终的 APK，我们把它命名为 cordova-demo.apk 。它就是可以直接上传到应用商店的版本。

自动打包

一旦有了 keystore 文件，下次打包就可以很快了。你可以在 cordova build 中指定所有参数来快速打包。这会直接生成一个 android-release.apk 给你。

cordova build android --release -- --keystore="release-key.keystore" --alias=cordova-demo --storePassword=testing --password=testing2
但每次输入命令行参数是很重复的，Cordova 允许我们建立一个 build.json 配置文件来简化操作。文件内容如下：
```
{
  "android": {
    "release": {
      "keystore": "release-key.keystore",
      "alias": "cordova-demo",
      "storePassword": "testing",
      "password": "testing2"
    }
  }
}
```
下次就可以直接用 cordova build --release 了。

为了安全性考虑，建议不要把密码放在在配置文件或者命令行中，而是手动输入。你可以把密码相关的配置去掉，下次 build 过程中会弹出一个 Java 小窗口，提示你输入密码。

用 Gradle 配置自动打包

另一种配置方法是使用 Gradle ，一个 Android 的自动化构建工具。 cordova build android 的过程其实就是使用它。你要在 platforms/android 目录下建立 release-signing.properties 文件，内容类似下面这样：

storeFile=relative/path/to/keystore
storePassword=SECRET1
keyAlias=ALIAS_NAME
keyPassword=SECRET2
这个文件的名称和位置也是可以通过 Gradle 的配置 cdvReleaseSigningPropertiesFile 修改的。我觉得一般情况使用 build.json 就足够了。有兴趣的可以看这个 Cordova 官方教程
