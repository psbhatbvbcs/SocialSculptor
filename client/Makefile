build-production:
	docker build \
	-t react-app-production:production \
	--build-arg CADDYFILE=Caddyfile.production \
	--build-arg BASE_URL=https://apiSocialInsights.saarathi.me/api \
	-f Dockerfile.production .