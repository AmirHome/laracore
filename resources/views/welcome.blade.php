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
                <div class="title">Laravel 5</div>
                <a href="{{ url('/language/tr') }}">Türkçe</a> | <a href="{{ url('/language/en') }}">English</a>
                {{ App::getLocale()}}
                {{ trans('general.title') }}
                {{turkish_slug('amir home is best site .')}}
                <p>
                	
				<img class="activator" src="{{ url('/photo/300x200/service').'/image.jpg'}}">
				<img class="activator" src="{{ url('/photo/nullx200/service').'/image.jpg'}}">
				<img class="activator" src="{{ url('/photo/300xnull/service').'/image.jpg'}}">
                </p>

                <pre>versoin:<tt>{{ session('version') }}</tt></pre>
                
            </div>
        </div>
@endsection