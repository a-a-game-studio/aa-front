<script lang="ts" src="./frm_login.ts"></script>

<template>

<div class="container">
    <div class="card">
        <div class="card-header">
            Вход пользователя:
        </div>
        <div class="card-body">
            <form>
                <label>Логин</label>
                <input
                    @input="fInputLogin"
                    class="form-control"
                    placeholder="Логин"
                >
                <label>Пароль</label>
                <input
                    @input="fInputPswd"
                    class="form-control"
                    placeholder="Пароль"
                >
            </form>
        </div>
        <div class="card-footer">
            <button @click="fLogin()" type="button" class="btn btn-primary">Вход</button>
        </div>
    </div>
</div>
</template>