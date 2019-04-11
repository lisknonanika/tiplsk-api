# tiplsk-api
tiplsk - Public API

## HowTo

### 認証する
**POST:** /api/auth
- Required Params
  - id：ログインID
  - pw：パスワード
- Return
  - access-token

<br>

### 認証したユーザーの情報を取得する
**GET:** /api/user
- Return
  - ユーザー情報

※HTTP Session or HTTP Header:x-access-tokenにaccess-tokenの設定が必要

<br>

### 認証したユーザーの入出金履歴を日時の降順で取得する
**GET:** /api/history
- Optional Params
  - offset：開始位置(初期値0)
  - limit：最大取得件数(初期値20)
- Return
  - 入出金履歴

※HTTP Session or HTTP Header:x-access-tokenにaccess-tokenの設定が必要

<br>

### 認証したユーザーから対象リスクアドレスに送金する
**PUT:** /api/withdraw
- Required Params
  - liskAddress：送金先
  - amount：送金額
- Return
  - 送金結果

※HTTP Session or HTTP Header:x-access-tokenにaccess-tokenの設定が必要

<br>

### 認証したユーザーのパスワードを変更する
**PUT:** /api/password
- Required Params
  - pw：パスワード
- Return
  - 変更結果

※HTTP Session or HTTP Header:x-access-tokenにaccess-tokenの設定が必要
