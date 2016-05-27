@extends('layouts.temp_master')

@section('page_title', 'home')

@section('head_extra')
<!-- head_extra -->
@endsection

@section('javascript_extra')
<!-- javascript_extra -->
@endsection

@section('content')
        <div class="container">
            <div class="content">
                <div class="title">{!! base64_encode ( 'AmirHosseinzadeh' ),'<BR>' ,base64_decode ( 'QW1pckhvc3NlaW56YWRlaA==' ) !!} Laravel 5</div>
                <a href="{{ url('/language/tr') }}">Türkçe</a> | <a href="{{ url('/language/en') }}">English</a>
                {{ App::getLocale()}}
                {{ trans('general.title') }}

                <pre>{{ session('version') }}</pre>
            </div>
        </div>
@endsection