Để có thể chạy được ứng dụng, máy tính phải có các yêu cầu sau:

1. Yêu cầu và cài đặt FE: 
	Cài đặt npm.
	Cài đặt NodeJS.
	Cài đặt AngularJS.
	Cần có Windows Terminal hoặc Command Prompt.
	Các bước để tiến hành cài đặt:

	*Bước 1: Clone hoặc download project từ link github (Link github: https://github.com/ngoclam9200/tieuluanchuyennganh)

	*Bước 2: Khởi chạy Front-end.

	Sau khi clone project về máy, chuột phải vào thư mục front và chọn mở bằng Visual Studio Code.

	Mở terminal mới. Sau khi Windows Terminal hiện ra, chạy lệnh "npm install" để cập nhật các thư viện và package cần thiết để project hoạt động.

	Tiếp tục chạy lệnh "npm start" trên Windows Terminal để bắt đầu chạy Front-end.
 
	*Bước 3: Cấu hình Web API cho FE

	Mặc định sử dụng Web API đã deploy là: "https://webbanhangapitienlam.azurewebsites.net", thay đổi Web API theo mong muốn.

	Có thể thay đổi host API phía Back-end theo đường dẫn thư mục: /src/services/api.servicve.ts

2. Yêu cầu và cài đặt BE:
	Cài đặt SQL Server.
	Cài đặt Visual Studio (khuyến nghị bản Visual Studio 2019 Community).
	Cần có ASP.NET Runtime 5.0
	Cần có Windows Terminal hoặc Command Prompt.
	Các bước để tiến hành cài đặt:

	*Bước 1: Clone hoặc download project từ link github (Link github: https://github.com/NguyenTien243/WebBanHang)

	*Bước 2: Khởi chạy Back-end.

	Sau khi clone project về máy, mở project bằng Visual Studio.

	Có thể chạy Back-end bằng "IIS Express" hoặc "WebBanHangAPI".

	*Lưu ý: Khi chạy bằng "IIS Express" sẽ chạy bằng localhost cổng 44371 (https://localhost:44371), 
		còn với "WebBanHangAPI" sẽ chạy bằng localhost cổng 5001 (https://localhost:5001) 
 
	*Bước 3: File cấu hình cho BE

	Có thể điều chỉnh các thông tin như chuỗi kết nối Database, Thiết lập Email, thiết lập thanh toán Paypal trong file "appsettings.json".



Phần hướng dẫn mặc định của Angular (có thể bỏ qua)
# Weboto

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
