import Mongoose from 'mongoose';

const PageSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: [
    {
      blockId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Block',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

PageSchema.pre('save', async function (next) {
  const page = this;
  page.updatedAt = Date.now();
  next();
});

PageSchema.statics.addBlock = async function (pageId, block) {
  const thePage = this;
  const page = await thePage.findById(pageId);
  page.content.push({ blockId: block._id });
  await page.save();
  return page;
};

PageSchema.statics.removeBlock = async function (pageId, blockId) {
  const thePage = this;
  const page = await thePage.findById(pageId);
  page.content = page.content.filter((block) => block.blockId !== blockId);
  await page.save();
  return page;
};

PageSchema.statics.addBlocks = async function (pageId, blocks) {
  const thePage = this;
  const page = await thePage.findById(pageId);
  page.content = page.content.concat(blocks);
  await page.save();
  return page;
};

PageSchema.statics.updatePage = async function (pageId, pageUpdate) {
  const thePage = this;
  const page = await thePage.findById(pageId);
  // for each key in page, update the page
  page.title = pageUpdate.title;
  page.content = pageUpdate.content;
  await page.save();
  return page;
};

const Page = Mongoose.model('Page', PageSchema);

export default Page;
