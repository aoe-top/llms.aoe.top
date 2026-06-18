# 【C++】读取网页内容并解析数据实现自动检测更新 | 小莫的博客园

Source: https://blog.aoe.top/c/362
Friendly site: 小莫博客园
Group: AOE.TOP
Fetched: 2026-06-18T02:28:51.111Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 读取的网页是3DM Mod站的API；如需使用API，需要先在发布Mod之前，勾选“启用API” 然后即可在Mod页面的左上角看到“API”按钮（仅作者可见） 点击即可打开API页面（如 https://mod.3dmgame.com/mod/API/147160 ），查看当前Mod的json数据，要检查更新，只需要判断“mods_version”参数即可（当然，你也可以判断别的参数） 以C+

## Content

# 【C++】读取网页内容并解析数据实现自动检测更新

- 2023-07-07

- 作者 小莫

读取的网页是3DM Mod站的API；
如需使用API，需要先在发布Mod之前，勾选“启用API”

然后即可在Mod页面的左上角看到“API”按钮（仅作者可见）

点击即可打开API页面（如 https://mod.3dmgame.com/mod/API/147160 ），查看当前Mod的json数据，要检查更新，只需要判断“mods_version”参数即可（当然，你也可以判断别的参数）

以C++为例，我解析json使用的库是： https://github.com/nlohmann/json
先引用需要用到的资源

1
2
3
4
5
6
7
8
9

|
#include <atlstr.h>
#include <wininet.h>
#pragma comment(lib, "wininet.lib")

#include "json/json.hpp"

#include <sstream>
#include <iomanip>
using json = nlohmann::json;

|

读取网页数据：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57

|

//对网页进行转码
wchar_t* Convert(CString str, int targetCodePage)
{

int iunicodeLen = MultiByteToWideChar(targetCodePage, 0, (LPCTSTR)str.GetBuffer(), -1, NULL, 0);
wchar_t* pUnicode = NULL;
pUnicode = new wchar_t[iunicodeLen + 1];
memset(pUnicode, 0, (iunicodeLen + 1) * sizeof(wchar_t));
MultiByteToWideChar(targetCodePage, 0, (LPCTSTR)str.GetBuffer(), -1, (LPWSTR)pUnicode, iunicodeLen);//映射一个字符串到一个款字节中
return pUnicode;
}

/*获取网页的源码，参数1为网页链接，2为缓冲区指针*/
bool GetHtml(LPCTSTR szURL, CString& getbuf)
{
HINTERNET hInternet, hUrl;
char buffer[1124];
WCHAR wBuffer[1124];

DWORD dwBytesRead = 0;
DWORD dwBytesWritten = 0;
BOOL bIsFirstPacket = true;
BOOL bRet = true;
int nNowcopyDate = 0;

hInternet = InternetOpen(_T("Mozilla/4.0 (compatible)"), INTERNET_OPEN_TYPE_PRECONFIG, NULL, INTERNET_INVALID_PORT_NUMBER, 0);//初始化应用程序，使用WinNet
if (hInternet == NULL)
return FALSE;

hUrl = InternetOpenUrl(hInternet, szURL, NULL, 0, INTERNET_FLAG_RELOAD, 0);//打开一个资源 ftp，gopher，http开头

if (hUrl == NULL)
{
DWORD m = GetLastError();
return FALSE;
}
do
{
memset(buffer, 0, sizeof(char) * 1124);
InternetReadFile(hUrl, buffer, sizeof(char) * 1024, &dwBytesRead);
bIsFirstPacket = false;
nNowcopyDate = +dwBytesRead;
wchar_t* punicode;
punicode = Convert(buffer, CP_UTF8);// 对源码进行转码 第二个参数为网页的编码格式

//CString strTmp = CString(buffer);

getbuf += _T("\r\n");
getbuf += punicode;
delete punicode;
} while (dwBytesRead > 0);

InternetCloseHandle(hUrl);
InternetCloseHandle(hInternet);
return TRUE;
}

|

检查更新：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36

|
//检测更新
string CheckUpdates()
{
double nowV = 0.901;
std::stringstream str;
str << std::setprecision(3) << nowV;
string v = "当前版本 " + str.str() + " ";
try
{
json js;
CString retbuf;
if (GetHtml(TEXT("https://mod.3dmgame.com/mod/API/147160"), retbuf)) //是否成功读取，将值写入retbuf
{
//retbuf值：
//{"id":"147160","mods_version":"0.81","mods_author":"◕小莫◕","mods_click_cnt":295451,"mods_download_cnt":90961,"mods_mark_cnt":37389,"mods_collection_cnt":19098,"mods_updateTime":"2020-03-29 15:39:57"}
js = json::parse((string)retbuf); //str to json
string newVs = js["mods_version"]; //获取版本
float newVf = stof(newVs); //转为float
if (nowV < newVf) //判断版本新旧
{
return GT(v +"[有新更新可用!]");
}
else {
return GT(v +"[已是最新版本]");
}
}
else
{
return GT(v + "[无法检测更新]");
}
}
catch (const std::exception&)
{
return GT(v + "[无法检测更新]");
}
}

|

顺便提一下，GT()函数是我写的一个GBK 转UTF8的汉化，用来解决中文乱码的问题：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17

|
//GBK编码转换到UTF8编码
string GT(const string& strGBK)
{
string strOutUTF8 = "";
WCHAR* str1;
int n = MultiByteToWideChar(CP_ACP, 0, strGBK.c_str(), -1, NULL, 0);
str1 = new WCHAR[n];
MultiByteToWideChar(CP_ACP, 0, strGBK.c_str(), -1, str1, n); n = WideCharToMultiByte(CP_UTF8, 0, str1, -1, NULL, 0, NULL, NULL);
char* str2 = new char[n];
WideCharToMultiByte(CP_UTF8, 0, str1, -1, str2, n, NULL, NULL);
strOutUTF8 = str2;
delete[]str1;
str1 = NULL;
delete[]str2;
str2 = NULL;
return strOutUTF8;
}

|

本作品采用 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 进行许可

打赏

分享

C++ , 网页 , 自动更新

最后编辑：2026-05-07

上一篇

下一篇
