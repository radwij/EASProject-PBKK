<template>
  <SignupForm @go-to-login="$router.push('/login')" />
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
  components: { SignupForm }
}
</script>
