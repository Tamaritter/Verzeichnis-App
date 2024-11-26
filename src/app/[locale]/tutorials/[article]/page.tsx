'use server';

import {Paper} from '@mui/material';

import {getTutorials} from '@/app/[locale]/tutorials/util';
import {notFound} from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = getTutorials();

  return posts.map(post => ({
    article: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{article: string}>;
}) {
  const {article} = await params;

  const post = getTutorials().find(post => post.slug === article);

  if (!post) {
    notFound();
  }

  const content = post.content;

  return (
    <>
      <Paper sx={{p: 2}}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Paper>
    </>
  );
}
